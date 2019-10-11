import { Module } from '@nestjs/common';
import { ConnectionProvider } from './connection';

@Module({
    providers: [ConnectionProvider],
    exports: [ConnectionProvider],
})
export class DatabaseModule {}
