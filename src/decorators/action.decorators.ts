import { ActionSchema } from 'moleculer';
import { merge } from './utils';

export function Action(schema?: ActionSchema): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    target.constructor.__schema = merge(
      target.constructor.__schema,
      {
        actions: {
          [propertyKey]: {
            ...schema,
            // @ts-ignore
            handler: function (...args) {
              return descriptor.value.call(this, ...args)
            }
          }
        }
      }
    )
  }
}

const actionHook = (key: string, type: string, serviceLevel: boolean): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    target.constructor.__schema = merge(
      target.constructor.__schema,
      serviceLevel ?
        {
          hooks: {
            [type]: {
              [key]: [descriptor.value]
            }
          }
        }
        : {
          actions: {
            [key]: {
              hooks: {
                [type]: [descriptor.value]
              }
            }
          }
        }
    )
  }
}

// Action Hooks at action Level
export function BeforeActionHook(key: string) {
  return actionHook(key, 'before', false);
}

export function BeforeHook() {
  return actionHook("*", 'before', true);
}

export function BeforeActionServiceHook(key: string) {
  return actionHook(key, 'before', true);
}


export function AfterActionHook(key: string) {
  return actionHook(key, 'after', false);
}

export function AfterActionServiceHook(key: string) {
  return actionHook(key, 'after', true);
}

export function AfterHook() {
  return actionHook("*", 'after', true);
}


export function ErrorActionHook(key: string) {
  return actionHook(key, 'error', false);
}

export function ErrorActionServiceHook(key: string) {
  return actionHook(key, 'error', true);
}

export function ErrorHook() {
  return actionHook("*", 'error', true);
}
