import { ProjectEntity } from '../../models/entities/project.entity';

export class CreateDraftProjectCommand {
    constructor(public readonly draftProject: ProjectEntity) {}
}
