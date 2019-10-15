import { Provider } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Connection } from '../src/database/connection';
import { ProjectEntity } from '../src/project/models/entities/project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export class mockProjectsRepository {
    // @ts-ignore
    create(): ProjectEntity {
        return project;
    }
}

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
