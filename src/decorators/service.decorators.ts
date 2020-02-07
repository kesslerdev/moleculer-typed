import { ServiceSchema, ActionSchema } from 'moleculer';
import { merge } from './utils';

export function Service(schema: Partial<ServiceSchema> = {}): ClassDecorator {
  return (constructor: any) => {

    constructor.__schema = merge(constructor.__schema, {
      name: constructor.name
    }, schema)

    return constructor
  }
}
