import { IsNumber, IsString } from 'class-validator';

export class Skill {
    @IsString(this.allGroup)
    public name: string;

    @IsNumber(this.allGroup)
    public totalWeeklyHr: number;

    @IsNumber(this.allGroup)
    public minWeeklyHr: number;

    @IsNumber(this.allGroup)
    public minSkillLvl: number;
}
