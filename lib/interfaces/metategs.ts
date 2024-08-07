import { ConsumeMessage } from 'amqplib';
import { ISerDes } from './serdes.interface';
import { TypeRmqMiddleware } from './middleware.interface';

export type IConsumFunction = (
  message?: any,
  consumeMessage?: ConsumeMessage,
) => any | void;
export interface MetaTegEnpoint {
  handler: IConsumFunction;
  serdes?: ISerDes | undefined;
  interceptors: CallbackFunctionVariadic[];
  middlewares: TypeRmqMiddleware[];
}
export type IMetaTegsMap = Map<string, MetaTegEnpoint>;
export interface IDescriptorRoute {
  value?: IConsumFunction;
}

export type CallbackFunctionVariadic = (...args: any[]) => any;
