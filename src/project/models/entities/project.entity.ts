import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { ArrayMinSize, IsNotEmpty, MaxLength, MinLength, validate, ValidationError } from 'class-validator';
import { SkillEntity } from './skill.entity';

@Entity('projects')
@Index(['creator'])
@Index(['published'])
export class ProjectEntity extends AggregateRoot {
    @PrimaryColumn()
    public uuid: string;

    @CreateDateColumn()
    public dateFrom: Date;

    @CreateDateColumn()
    public dateTo: Date;

    @ArrayMinSize(1)
    public languages: string[];

    @OneToMany((type) => SkillEntity, (skill) => skill.projectId, {
        eager: true,
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE',
    })
    @ArrayMinSize(1)
    public requestedSkills: SkillEntity[];

    @IsNotEmpty()
    @Column({ type: 'text', nullable: false })
    public creator: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    @Column({ type: 'text', nullable: false })
    public title: string;

    @MinLength(3)
    @Column({ type: 'text', nullable: false })
    public description: string;

    @Column({ type: 'boolean', default: false })
    public published: boolean;

    @IsNotEmpty()
    @ArrayMinSize(1)
    @Column({ type: 'text', nullable: false })
    public locations: string[];

    @Column({ type: 'text', nullable: false })
    public image: string;

    @ArrayMinSize(1)
    public keywords: string[];

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public publishedAt: Date;

    @CreateDateColumn()
    public kickoffedAt: Date;

    @CreateDateColumn()
    public submittedAt: Date;

    public async validationErrors(): Promise<ValidationError[]> {
        return await validate(this);
    }
}
