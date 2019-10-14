import { HttpException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectsRepository } from '../../models/repositories/projects.repository';
import { CreateDraftProjectCommand } from '../impl/create-draft-project.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../../models/entities/project.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateDraftProjectCommand)
export class CreateDraftHandler implements ICommandHandler<CreateDraftProjectCommand> {
    constructor(
        @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
        ) {}

    public async execute(createDraftCommand: CreateDraftProjectCommand) {

        const errors = await createDraftCommand.draftProject.validationErrors();
        if (errors.length === 0) {
            try {
                console.log( '------', this.projectRepository );
                return await this.projectRepository.create(createDraftCommand.draftProject);
            } catch (e) {
                console.log( '======', e );
                throw new InternalServerErrorException();
            }
        } else {
            throw new HttpException('Failed validating the project', 400);
        }
    }
}
