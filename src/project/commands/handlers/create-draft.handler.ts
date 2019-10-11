import { HttpException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectsRepository } from '../../models/repositories/projects.repository';
import { CreateDraftProjectCommand } from '../impl/create-draft-project.command';

@CommandHandler(CreateDraftProjectCommand)
export class CreateDraftHandler implements ICommandHandler<CreateDraftProjectCommand> {
    constructor(private readonly projectRepository: ProjectsRepository) {}

    public async execute(createDraftCommand: CreateDraftProjectCommand) {

        const errors = await createDraftCommand.draftProject.validationErrors();
        if (errors.length === 0) {
            try {
                return await this.projectRepository.create(createDraftCommand.draftProject);
            } catch (e) {
                throw new InternalServerErrorException();
            }
        } else {
            throw new HttpException('Failed validating the project', 400);
        }
    }
}
