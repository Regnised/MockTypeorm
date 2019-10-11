import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('skills')
@Index(['name'])
export class SkillEntity {
    @PrimaryColumn()
    public uuid: string;

    @ManyToOne((type) => ProjectEntity, (project) => project.requestedSkills, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'projectId',
        referencedColumnName: 'uuid',
    })
    public projectId: string;

    @Column({ type: 'text' })
    public name: string;

    @Column({ type: 'integer', nullable: false })
    public totalWeeklyHr: number;

    @Column({ type: 'integer', nullable: false })
    public minWeeklyHr: number;

    @Column({ type: 'integer', nullable: false })
    public minSkillLvl: number;
}
