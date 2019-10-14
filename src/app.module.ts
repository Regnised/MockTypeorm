import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ProjectModule,
        TypeOrmModule.forRoot(),
    ],
})
export class AppModule {}
