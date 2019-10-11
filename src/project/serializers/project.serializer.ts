import { ProjectDto } from '../dto/project.dto';
import { ProjectEntity } from '../models/entities/project.entity';

export class ProjectSerializer {
    public serialize(project: ProjectEntity): ProjectDto {
        const dto: ProjectDto = {
            ...project,
            keywords: project.keywords.map((keyword) => {
                return keyword;
            }),
        };
        return dto;
    }

    public deserialize(projectDTO: ProjectDto): ProjectEntity {
        const project = new ProjectEntity();
        Object.assign(project, {
            ...projectDTO,
        });

        return project;
    }
}
