import { Provider } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Connection } from '../../../database/connection';
import { ApplicationEntity } from '../entities/application.entity';

export class ApplicationsRepository extends Repository<ApplicationEntity> {}

async function applicationsRepositoryFactory(connection: Connection): Promise<ApplicationsRepository> {
    return connection.getRepository(ApplicationEntity);
}

export const ApplicationsRepositoryProvider: Provider = {
    provide: ApplicationsRepository,
    useFactory: applicationsRepositoryFactory,
    inject: [Connection],
};
