import { mergeWith, isArray, uniq } from 'lodash';

// @ts-ignore
export const merge = (...args) => mergeWith(...args, (objValue, srcValue) => {
  if (isArray(objValue)) {
    return uniq([...objValue, ...srcValue]);
  }
})
