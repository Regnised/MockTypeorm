import { IsNotEmpty, IsString } from 'class-validator';
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
import { ProjectEntity } from './project.entity';

@Entity('tags')
@Index(['name'])
export class TagEntity {
    @PrimaryColumn()
    public uuid: string;

    @IsNotEmpty()
    @ManyToOne((type) => ProjectEntity, (project) => project.keywords, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'projectId',
        referencedColumnName: 'uuid',
    })
    public project: ProjectEntity;

    @Column({ type: 'text' })
    @IsNotEmpty()
    @IsString()
    public name: string;

    @BeforeInsert()
    public addUuid() {
        this.uuid = v4();
    }
}
