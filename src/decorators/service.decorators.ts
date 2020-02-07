import { ServiceSchema } from 'moleculer';
import { set } from 'lodash';
import { merge } from './utils';

export function Service(schema: Partial<ServiceSchema> = {}): ClassDecorator {
  return (constructor: any) => {

    constructor.__schema = merge(constructor.__schema, {
      name: constructor.name
    }, schema)

    return constructor
  }
}

export function SetSchema(path: string): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    target.constructor.__schema = merge(
      target.constructor.__schema,
      set({}, path, descriptor.value)
    )
  }
}
