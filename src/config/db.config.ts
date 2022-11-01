import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '901256KKkk',
  database: 'config',
  entities: [__dirname + './../../dist/entities/*.entity.js'],
  synchronize: true,
};
