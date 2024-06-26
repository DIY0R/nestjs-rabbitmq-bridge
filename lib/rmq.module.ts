import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import {
  IMessageBroker,
  IRabbitMQConfigAsync,
  IRabbitMQConfig,
  IGlobalBroker,
  IGlobalOptions,
} from './interfaces';
import { MODULE_TOKEN, RMQ_BROKER_OPTIONS, TARGET_MODULE } from './constants';
import { DiscoveryModule } from '@nestjs/core';
import { MetaTegsScannerService, getUniqId } from './common';
import { RmqNestjsCoreModule } from './rmq-core.module';

@Module({})
export class RmqNestjsModule {
  static forRoot(
    configOptions: IRabbitMQConfig,
    globalOptions?: IGlobalOptions,
  ): DynamicModule {
    return {
      module: RmqNestjsModule,
      imports: [RmqNestjsCoreModule.forRoot(configOptions, globalOptions)],
    };
  }
  static forRootAsync(
    configOptions: IRabbitMQConfigAsync,
    globalOptions?: IGlobalOptions,
  ): DynamicModule {
    return {
      module: RmqNestjsModule,
      imports: [RmqNestjsCoreModule.forRootAsync(configOptions, globalOptions)],
    };
  }
  static forFeature(options: IMessageBroker): DynamicModule {
    return {
      module: RmqNestjsModule,
      imports: [DiscoveryModule],
      providers: [
        { provide: RMQ_BROKER_OPTIONS, useValue: options },
        { provide: MODULE_TOKEN, useFactory: getUniqId },
        RmqService,
        MetaTegsScannerService,
      ],
      exports: [RmqService],
    };
  }
}
