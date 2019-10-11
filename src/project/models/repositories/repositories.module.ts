import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { ApplicationsRepositoryProvider } from './applications.repository';
import { ProjectsRepositoryProvider } from './projects.repository';

@Module({
    imports: [DatabaseModule],
    providers: [ProjectsRepositoryProvider, ApplicationsRepositoryProvider],
    exports: [ProjectsRepositoryProvider, ApplicationsRepositoryProvider, DatabaseModule],
})
export class RepositoriesModule {}
