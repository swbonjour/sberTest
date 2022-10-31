import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigDto } from 'src/dto/config.dto';
import { IInUse } from 'src/interfaces/config.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Config } from 'src/entities/config.entity';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config) private configRepository: Repository<Config>,
  ) {}

  private inUse: IInUse = {
    version: '',
    service: '',
  };

  setInUse(version: string, service: string) {
    this.inUse = {
      version: version,
      service: service,
    };
  }

  async getConfig(
    service: string,
    version?: string,
  ): Promise<Config | HttpException | Config[] | object> {
    if (service == undefined && version == undefined) {
      return new HttpException('You have not point any service', 400);
    }
    try {
      if (!version) {
        const data = await this.configRepository.find({
          where: {
            service: service,
          },
        });
        if (data.length == 0)
          return new HttpException('There is no such service', 400);
        this.setInUse(data[data.length - 1].version, service);
        const returnedData = data[data.length - 1];
        return { config: returnedData, status: 200 };
      } else {
        const data = await this.configRepository.find({
          where: {
            service: service,
            version: version,
          },
        });
        if (data.length == 0)
          return new HttpException('There is no such service or version', 400);
        this.setInUse(version, service);
        const returnedData = data[0];
        return { config: returnedData, status: 200 };
      }
    } catch (e: any) {
      return new HttpException(e.message, 400);
    }
  }

  async createConfig(
    dto: ConfigDto,
  ): Promise<Config | string | HttpException | HttpStatus | object> {
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

        await this.configRepository.save(newConfig);
        return { newConfig, status: 200, message: 'Successfully created' };
      } else {
        return new HttpException(`The service name is alreay in use`, 400);
      }
    } catch (e: any) {
      return new HttpException(e.message, 400);
    }
  }

  async updateConfig(
    dto: ConfigDto,
  ): Promise<Config | HttpException | HttpStatus | object> {
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
        await this.configRepository.save(updatedConfig);
        return {
          updatedConfig,
          status: 200,
          message: 'Config successfully updated',
        };
      } else {
        return new HttpException(`There is no such config`, 400);
      }
    } catch (e: any) {
      return new HttpException(e.message, 400);
    }
  }

  async deleteConfig(
    dto: ConfigDto,
  ): Promise<DeleteResult | HttpException | object> {
    try {
      if (
        (this.inUse.version == dto.version &&
          this.inUse.service == dto.service) ||
        dto.version == undefined
      ) {
        return new HttpException(
          'This config is in use or you have not point a version',
          400,
        );
      }
      const deletedConfig = await this.configRepository.find({
        where: {
          service: dto.service,
          version: dto.version,
        },
      });
      if (deletedConfig.length == 0) {
        return new HttpException('There is no such config', 400);
      }
      const deleteConfig = this.configRepository
        .createQueryBuilder()
        .delete()
        .where({
          service: dto.service,
          version: dto.version,
        });
      await deleteConfig.execute();
      return { deletedConfig, status: 200, message: 'Successfully deleted' };
    } catch (e: any) {
      return new HttpException(e.message, 400);
    }
  }
}
