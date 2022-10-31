import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from 'src/services/config.service';
import { ConfigDto } from 'src/dto/config.dto';
import { IConfig } from 'src/interfaces/config.interface';
import { Config } from 'src/entities/config.entity';

@Controller('/config')
export class ConfigController {
  constructor(private configService: ConfigService) {}
  @Get('/:service?')
  getConfig(@Param() params: IConfig, @Query() query: IConfig) {
    const service: string = params.service;
    const version: string = query.version;
    return this.configService.getConfig(service, version);
  }

  @Post()
  createConfig(
    @Body() dto: ConfigDto,
  ): Promise<string | object | Config | HttpException | HttpStatus> {
    return this.configService.createConfig(dto);
  }

  @Put()
  updateConfig(
    @Body() dto: ConfigDto,
  ): Promise<string | object | Config | HttpException | HttpStatus> {
    return this.configService.updateConfig(dto);
  }

  @Delete()
  deleteConfig(
    @Body() dto: ConfigDto,
  ): Promise<string | object | Config | HttpException | HttpStatus> {
    return this.configService.deleteConfig(dto);
  }
}
