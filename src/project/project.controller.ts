import {
    Body,
    Controller,
    Post,
    Req,
    ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as uuid from 'uuid/v4';
import { CreateDraftProjectCommand } from './commands/impl/create-draft-project.command';
import { ProjectDto } from './dto/project.dto';
import { ProjectEntity } from './models/entities/project.entity';
import { ProjectSerializer } from './serializers/project.serializer';

@Controller()
export class ProjectController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly projectSerializer: ProjectSerializer,
    ) {}

    @Post('draft')
    public async draft(
        @Req() request,
        @Body(new ValidationPipe({ groups: ['create'] })) draftProject: ProjectDto,
    ): Promise<string> {
        const userId: string = request.header('CURRENT_USER_ID');
        draftProject.uuid = uuid();
        draftProject.creator = userId;

        const project: ProjectEntity = this.projectSerializer.deserialize(draftProject);
        const command = new CreateDraftProjectCommand(project);
        // console.log('-----------', await this.commandBus.execute(command));

        return Promise.resolve(project.uuid);
    }
}
