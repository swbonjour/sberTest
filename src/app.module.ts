import { Module } from '@nestjs/common';
import { ConfigController } from './controllers/config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { ConfigProvider } from './services/config.service';
import { Config } from './entities/config.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Config]),
  ],
  controllers: [ConfigController],
  providers: [ConfigProvider],
})
export class AppModule {}
