import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import {
  IMessageBroker,
  IRMQSRootAsyncOptions,
  IRabbitMQConfig,
} from './interfaces';
import { MODULE_TOKEN, RMQ_BROKER_OPTIONS, TARGET_MODULE } from './constants';
import { DiscoveryModule } from '@nestjs/core';
import { MetaTegsScannerService, getUniqId } from './common';
import { RmqNestjsCoreModule } from './rmq-core.module';
import { IAppOptions } from './interfaces/app-options.interface';

@Module({})
export class RmqNestjsModule {
  static forRoot(
    options: IRabbitMQConfig,
    appOptions?: IAppOptions,
  ): DynamicModule {
    return {
      module: RmqNestjsModule,
      imports: [RmqNestjsCoreModule.forRoot(options, appOptions)],
    };
  }
  static forRootAsync(
    options: IRMQSRootAsyncOptions,
    appOptions?: IAppOptions,
  ): DynamicModule {
    return {
      module: RmqNestjsModule,
      imports: [RmqNestjsCoreModule.forRootAsync(options, appOptions)],
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
