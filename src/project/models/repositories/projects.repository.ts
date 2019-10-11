import { Provider } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Connection } from '../../../database/connection';
import { ProjectEntity } from '../entities/project.entity';

export class ProjectsRepository extends Repository<ProjectEntity> {}

async function projectsRepositoryFactory(connection: Connection): Promise<ProjectsRepository> {
    return connection.getRepository(ProjectEntity);
}

export const ProjectsRepositoryProvider: Provider = {
    provide: ProjectsRepository,
    useFactory: projectsRepositoryFactory,
    inject: [Connection],
};
