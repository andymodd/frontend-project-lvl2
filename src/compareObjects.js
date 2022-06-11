import _ from 'lodash';
import { isObject } from './utils.js';

const compareObjects = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const intersection = _.intersection(keys1, keys2);
  const keys = _.uniq([...keys1, ...keys2]);

  const difference = keys.map((key) => {
    const isObject1 = isObject(object1[key]);
    const isObject2 = isObject(object2[key]);
    if (intersection.includes(key)) {
      if (isObject1 && isObject2) {
        return { name: key, children: compareObjects(object1[key], object2[key]) };
      } if (object1[key] === object2[key]) {
        return { name: key, status: 'unchanged', value: object1[key] };
      }
      return {
        name: key, status: 'changed', value: isObject2 ? _.cloneDeep(object2[key]) : object2[key], previous: isObject1 ? _.cloneDeep(object1[key]) : object1[key],
      };
    } if (keys1.includes(key)) {
      return { name: key, status: 'deleted', value: isObject1 ? _.cloneDeep(object1[key]) : object1[key] };
    }
    return { name: key, status: 'added', value: isObject2 ? _.cloneDeep(object2[key]) : object2[key] };
  });
  return difference;
};

export default compareObjects;
