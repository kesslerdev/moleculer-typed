import { merge } from './utils';

export function Method(): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    target.constructor.__schema = merge(
      target.constructor.__schema,
      {
        methods: {
          [propertyKey]: descriptor.value
        }
      }
    )
  }
}
