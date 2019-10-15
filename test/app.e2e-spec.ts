import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProjectEntity } from '../src/project/models/entities/project.entity';
import { Repository } from 'typeorm';
import { mockProjectsRepository } from './projects.repository';
import { ProjectsRepository, ProjectsRepositoryProvider } from '../src/project/models/repositories/projects.repository';
import { CreateDraftHandler } from '../src/project/commands/handlers/create-draft.handler';
import { RepositoriesModule } from '../src/project/models/repositories/repositories.module';

const project = {
    title: 'Test title 1',
    description: 'Test description',
    dateFrom: new Date('2019-09-17T10:52:07.383Z'),
    dateTo: new Date('2019-09-29T10:52:07.383Z'),
    locations: ['Berlin'],
    languages: ['English', 'German'],
    keywords: ['test', 'project', 'draft'],
    requestedSkills: [
        {
            name: 'Marketing',
            totalWeeklyHr: 40,
            minWeeklyHr: 10,
            minSkillLvl: 0,
        },
        {
            name: 'Marketing2',
            totalWeeklyHr: 40,
            minWeeklyHr: 10,
            minSkillLvl: 0,
        },
    ],
    creator: '123qwe',
    uuid: 'testUUID',
} as ProjectEntity;

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let created1UUID: string;
    const currentUserId = '123qwe';

    const mockRepository = jest.fn(() => ({
        metadata: {
            columns: [],
            relations: [],
        },
    }));
    // const responseCreate = {...};
    // const responseFindAll = {...};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ AppModule, TypeOrmModule.forFeature([ProjectEntity])],
            providers: [
                CreateDraftHandler,
                RepositoriesModule,
                {
                    provide: ProjectsRepository,
                    useFactory: () => ({
                        create: jest.fn(
                            () => new Promise(resolve => resolve(project)),
                        ),
                        find: jest.fn(
                            () => new Promise(resolve => resolve(project)),
                        ),
                        findOne: jest.fn(
                            ({uuid}) =>
                                new Promise(resolve => {
                                    resolve(project);
                                }),
                        ),
                        delete: jest.fn(uuid => new Promise(resolve => resolve())),
                        save: jest.fn(data => new Promise(resolve => {
                            // data = data.uuid === undefined ? data.uuid = uuid() : data;
                            resolve(data);
                        })),
                    })
                }]
                }).compile();
        app = module.createNestApplication();

        await app.init();
    });

    it(`/POST draft`, async () => {
        const res = await request(app.getHttpServer())
            .post('/draft')
            .send(project)
            .set('CURRENT_USER_ID', currentUserId);

        // console.log( 'RES = ', res.text );
        created1UUID = res.text;
    });

    afterAll(async () => {
        await app.close();
    });
});
