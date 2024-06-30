import { Options } from 'amqplib';
import { LoggerService, ModuleMetadata } from '@nestjs/common';
import { RMQIntercepterClass, RMQPipeClass } from 'lib/common';

export interface IQueue {
  queue: string;
  options?: Options.AssertQueue;
  consumOptions?: Options.Consume;
}
export enum TypeQueue {
  QUEUE,
  REPLY_QUEUE,
}

export interface IExchange {
  exchange: string;
  type: 'direct' | 'topic' | 'headers' | 'fanout' | 'match';
  options?: Options.AssertExchange;
}

export interface IRabbitMQConfig {
  username: string;
  password: string;
  hostname: string;
  port: number;
  virtualHost: string;
}

export interface IRabbitMQConfigAsync extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<IRabbitMQConfig> | IRabbitMQConfig;
  inject?: any[];
}

export interface IMessageBroker {
  exchange: IExchange;
  replyTo?: IQueue;
  queue?: IQueue;
  messageTimeout?: number;
  serviceName?: string;
}
export interface IBindQueue {
  queue: string;
  source: string;
  pattern: string;
  args?: Record<string, any>;
}

export interface ISendMessage {
  exchange: string;
  routingKey: string;
  content: Record<string, any>;
  options: Options.Publish;
}
export interface IPublishOptions extends Options.Publish {
  timeout?: number;
}

export interface ISendToReplyQueueOptions {
  replyTo: string;
  content: Record<string, any>;
  correlationId: string;
  options?: Options.Publish;
}
export interface IAppOptions {
  logger?: LoggerService;
  globalMiddleware?: (typeof RMQPipeClass)[];
  globalIntercepters?: (typeof RMQIntercepterClass)[];
  errorHandler?: object;
  logMessages: boolean;
}
export interface IGlobalBroker {
  replyTo: IQueue;
  messageTimeout?: number;
  serviceName?: string;
}

export interface IGlobalOptions {
  globalBroker?: IGlobalBroker;
  appOptions?: IAppOptions;
}
export interface INotifyReply {
  status: string;
}
