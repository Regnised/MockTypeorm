import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProjectEntity } from '../src/project/models/entities/project.entity';

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

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: getRepositoryToken(ProjectEntity),
                    useValue: mockRepository,
                },
            ],
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
