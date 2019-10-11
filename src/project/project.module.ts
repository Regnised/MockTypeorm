import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { RepositoriesModule } from './models/repositories/repositories.module';
import { ProjectController } from './project.controller';
import { ProjectSerializer } from './serializers/project.serializer';

@Module({
    imports: [
        RepositoriesModule,
        CqrsModule,
    ],
    controllers: [ProjectController],
    providers: [
        ...CommandHandlers,
        ProjectSerializer,
    ],
})
export class ProjectModule {}
