import { ServiceEvent } from 'moleculer';
import { merge } from './utils';

export function Event(schema?: ServiceEvent): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    target.constructor.__schema = merge(
      target.constructor.__schema,
      {
        events: {
          [schema?.name || propertyKey]: {
            ...schema,
            handler: descriptor.value
          }
        }
      }
    )
  }
}
