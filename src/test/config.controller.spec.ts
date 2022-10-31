import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { dbConfig } from 'src/config/db.config';
import { ConfigController } from 'src/controllers/config.controller';
import { Config } from 'src/entities/config.entity';
import { ConfigService } from 'src/services/config.service';

describe('ConfigController', () => {
  let controller: ConfigController;

  const mockConfigService = {
    createConfig: jest.fn((dto: object) => {
      return {
        newConfig: { ...dto, id: 1, version: '1' },
        status: 200,
        message: 'Successfully created',
      };
    }),
    getConfig: jest.fn((service: string, version: string) => {
      return {
        config: {
          id: 1,
          version: version,
          service: service,
          data: {
            backgroundColor: 'black',
            color: 'white',
          },
        },
        status: 200,
      };
    }),
    updateConfig: jest.fn((dto: object) => {
      return {
        updatedConfig: { ...dto, id: 1, version: '2' },
        status: 200,
        message: 'Successfully updated',
      };
    }),
    deleteConfig: jest.fn((service: string, version: string) => {
      return {
        deletedConfig: {
          id: 1,
          version: version,
          service: service,
          data: {
            backgroundColor: 'black',
            color: 'white',
          },
        },
        status: 200,
        message: 'Successfully deleted',
      };
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([Config]),
      ],
      controllers: [ConfigController],
      providers: [ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    controller = module.get<ConfigController>(ConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a config if config doesnt exists', () => {
    expect(
      mockConfigService.createConfig({
        service: 'test',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        data: { backgroundColor: 'black', color: 'white' },
      }),
    ).toEqual({
      newConfig: {
        service: 'test',
        data: {
          backgroundColor: 'black',
          color: 'white',
        },
        id: 1,
        version: '1',
      },
      status: 200,
      message: 'Successfully created',
    });
  });

  it('should return config', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(mockConfigService.getConfig('test', '1')).toEqual({
      config: {
        id: 1,
        version: '1',
        service: 'test',
        data: {
          backgroundColor: 'black',
          color: 'white',
        },
      },
      status: 200,
    });
  });

  it('should update config', () => {
    expect(
      mockConfigService.updateConfig({
        service: 'test',
        data: { backgroundColor: 'white', color: 'black' },
      }),
    ).toEqual({
      updatedConfig: {
        service: 'test',
        data: {
          backgroundColor: 'white',
          color: 'black',
        },
        id: 1,
        version: '2',
      },
      status: 200,
      message: 'Successfully updated',
    });
  });

  it('should delete config', () => {
    expect(mockConfigService.deleteConfig('test', '1')).toEqual({
      deletedConfig: {
        service: 'test',
        data: {
          backgroundColor: 'black',
          color: 'white',
        },
        id: 1,
        version: '1',
      },
      status: 200,
      message: 'Successfully deleted',
    });
  });
});
