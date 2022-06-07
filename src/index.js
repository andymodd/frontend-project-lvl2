import _ from 'lodash';
import parse from './parsers.js';
import chooseFormatter from '../formatters/index.js';
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

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const diff = compareObjects(file1, file2);
  const formatter = chooseFormatter(formatName);
  return formatter(diff);
};

export default gendiff;
