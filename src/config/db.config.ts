import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mysql_server',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'config',
  entities: [__dirname + './../../dist/entities/*.entity.js'],
  synchronize: true,
};
