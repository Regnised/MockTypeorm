import { Provider } from '@nestjs/common';
import { Connection as TypeORMConnection, createConnection } from 'typeorm';

export class Connection extends TypeORMConnection {}

export const ConnectionProvider: Provider = {
    provide: Connection,
    useFactory: async () => await createConnection(),
};
