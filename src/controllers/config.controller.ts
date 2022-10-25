import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ConfigProvider } from 'src/services/config.service';
import { ConfigDto } from 'src/dto/config.dto';
import { IConfig } from 'src/interfaces/config.interface';

@Controller('/config')
export class ConfigController {
  constructor(private configProvider: ConfigProvider) {}
  @Get('/:service?')
  getConfig(@Param() params: IConfig, @Query() query: IConfig) {
    const service: string = params.service;
    const version: string = query.version;
    return this.configProvider.getConfig(service, version);
  }

  @Post()
  createConfig(@Body() dto: ConfigDto) {
    this.configProvider.createConfig(dto);
  }

  @Put()
  updateConfig(@Body() dto: ConfigDto) {
    this.configProvider.updateConfig(dto);
  }

  @Delete()
  deleteConfig(@Body() dto: ConfigDto) {
    this.configProvider.deleteConfig(dto);
  }
}
