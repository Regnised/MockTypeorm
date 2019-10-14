import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { RepositoriesModule } from './models/repositories/repositories.module';
import { ProjectController } from './project.controller';
import { ProjectSerializer } from './serializers/project.serializer';
import { ProjectsRepository, ProjectsRepositoryProvider } from './models/repositories/projects.repository';
import { DatabaseModule } from '../database/database.module';
import { CreateDraftHandler } from './commands/handlers/create-draft.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './models/entities/project.entity';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([ProjectEntity])
    ],
    controllers: [ProjectController],
    providers: [
        ...CommandHandlers,
        ProjectSerializer,
    ]
})
export class ProjectModule {}
