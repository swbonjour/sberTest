import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigDto } from 'src/dto/config.dto';
import { IConfig } from 'src/interfaces/config.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Config } from 'src/entities/config.entity';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class ConfigProvider {
  constructor(
    @InjectRepository(Config) private configRepository: Repository<Config>,
  ) {}

  private readonly configArr: IConfig = {
    version: '5',
    service: 'aboba',
    data: {},
  };

  async getConfig(
    service: string,
    version?: string,
  ): Promise<Config | HttpException> {
    try {
      if (!version) {
        return await this.configRepository.findOne({
          where: {
            service: service,
          },
        });
      } else {
        return await this.configRepository.findOne({
          where: {
            service: service,
            version: version,
          },
        });
      }
    } catch (e: any) {
      return new HttpException('Bad request', 400);
    }
  }

  async createConfig(
    dto: ConfigDto,
  ): Promise<Config | string | HttpException | HttpStatus> {
    try {
      const checkServiceName: Config[] = await this.configRepository.find({
        where: {
          service: dto.service,
        },
      });
      if (checkServiceName.length == 0) {
        const newConfig = await this.configRepository.create({
          service: dto.service,
          data: dto.data,
        });

        return await this.configRepository.save(newConfig);
      } else {
        console.log(
          `The service name is alreay in use ${HttpStatus.BAD_REQUEST}`,
        );
        return HttpStatus.BAD_REQUEST;
      }
    } catch (e: any) {
      return new HttpException(e.message, 400);
    }
  }

  async updateConfig(
    dto: ConfigDto,
  ): Promise<Config | HttpException | HttpStatus> {
    try {
      const configToUpdate: Config[] = await this.configRepository.find({
        where: {
          service: dto.service,
        },
      });
      if (configToUpdate.length != 0) {
        const updatedConfig = this.configRepository.create({
          version: String(
            Number(configToUpdate[configToUpdate.length - 1].version) + 1,
          ),
          service: configToUpdate[0].service,
          data: dto.data,
        });
        return await this.configRepository.save(updatedConfig);
      } else {
        console.log(`There is no such config ${HttpStatus.BAD_REQUEST}`);
        return HttpStatus.BAD_REQUEST;
      }
    } catch (e: any) {
      return new HttpException(e.message, 400);
    }
  }

  async deleteConfig(dto: ConfigDto): Promise<DeleteResult | HttpException> {
    try {
      const deleteConfig = this.configRepository
        .createQueryBuilder()
        .delete()
        .where({
          service: dto.service,
          version: dto.version,
        });
      return deleteConfig.execute();
    } catch (e: any) {
      return new HttpException(e.message, 400);
    }
  }
}
