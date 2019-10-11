import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateDraftHandler } from '../src/project/commands/handlers/create-draft.handler';
import { ProjectEntity } from '../src/project/models/entities/project.entity';
import { ApplicationEntity } from '../src/project/models/entities/application.entity';

const project = {
    title: 'Test title 1',
    description: 'Test description',
    dateFrom: new Date('2019-09-17T10:52:07.383Z'),
    dateTo: new Date('2019-09-29T10:52:07.383Z'),
    locations: ['Berlin'],
    languages: ['English', 'German'],
    department: [],
    subCompany: [],
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
};

const repositoryMockFactory: jest.Mock<
    { findOne: jest.Mock<any, [undefined]>; create: jest.Mock<any, [undefined]> },
    any[]
> = jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
    create: jest.fn((entity) => project),
    // ...
}));

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let created1UUID: string;
    const currentUserId = '123qwe';

    const mockProjectsRepo = new (jest.fn(() => ({
        create: jest.fn(),
    })))();

    const mockApplicationsRepo = new (jest.fn(() => ({
        create: jest.fn(),
    })))();

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                CreateDraftHandler,
                {
                    provide: getRepositoryToken(ProjectEntity),
                    useValue: mockProjectsRepo,
                },
                {
                    provide: getRepositoryToken(ApplicationEntity),
                    useValue: mockApplicationsRepo,
                },
            ],
        }).compile();
        const createDraftHandler = module.get<CreateDraftHandler>(CreateDraftHandler);
        app = module.createNestApplication();
        await app.init();
    });

    it(`/POST draft`, async () => {
        mockProjectsRepo.create.mockImplementation(() => project);
        const res = await request(app.getHttpServer())
            .post('/draft')
            .send(project)
            .set('CURRENT_USER_ID', currentUserId);

        console.log( 'RES = ', res );
        created1UUID = res.text;
    });

    afterAll(async () => {
        await app.close();
    });
});
