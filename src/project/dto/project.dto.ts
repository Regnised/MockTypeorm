import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { all, create, update } from './groups';
import { Skill } from './skill.dto';

export class ProjectDto {
    @IsOptional(update)
    @IsString(all)
    public uuid: string;

    @IsOptional(update)
    @IsString(all)
    public creator: string;

    @IsOptional(update)
    @IsString(all)
    @MinLength(3, all)
    public readonly title: string;

    @IsOptional(update)
    @IsString(all)
    public readonly dateFrom: Date;

    @IsOptional(update)
    @IsString(all)
    public readonly dateTo: Date;

    @IsOptional(update)
    @IsArray(all)
    @ArrayMinSize(1, all)
    @ArrayMaxSize(100, all)
    public readonly locations: string[];

    @IsOptional(update)
    @IsArray(all)
    @ArrayMinSize(1, all)
    @ArrayMaxSize(100, all)
    public readonly languages: string[];

    @IsOptional(update)
    @IsArray(all)
    @ArrayMinSize(1, all)
    @ArrayMaxSize(100, all)
    public readonly keywords: string[];

    @IsOptional(update)
    @IsString(all)
    @MinLength(3, all)
    public readonly description: string;

    @IsOptional(update)
    @IsArray(all)
    @ValidateNested({ each: true, groups: ['create', 'update'] })
    @Type(() => Skill)
    @ArrayMinSize(1, all)
    @ArrayMaxSize(100, all)
    public readonly requestedSkills: Skill[];
}
