import { inspect } from 'util';
import { merge } from './utils';

export function Param(schema?: any): ParameterDecorator {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {

    const desc = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    // target.constructor.__schema = merge(
    //   target.constructor.__schema,
    //   {
    //     actions: {
    //       [propertyKey]: {
    //         parameters: {
    //           []
    //         }
    //       }
    //     }
    //   }
    // )
  }
}
