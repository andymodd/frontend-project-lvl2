import _ from 'lodash';
import parse from './parsers.js';
import chooseFormatter from '../formatters/index.js';
import { isObject } from './utils.js';

const compareObjects = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const intersection = _.intersection(keys1, keys2);
  const keys = _.uniq([...keys1, ...keys2]);

  const difference = keys.reduce((acc, key) => {
    const diff = {};
    diff.name = key;
    const isObject1 = isObject(object1[key]);
    const isObject2 = isObject(object2[key]);
    if (intersection.includes(key)) {
      if (isObject1 && isObject2) {
        diff.children = compareObjects(object1[key], object2[key]);
      } else if (object1[key] === object2[key]) {
        diff.status = 'unchanged';
        diff.value = object1[key];
      } else {
        diff.status = 'changed';
        diff.previous = isObject1 ? _.cloneDeep(object1[key]) : object1[key];
        diff.value = isObject2 ? _.cloneDeep(object2[key]) : object2[key];
      }
    } else if (keys1.includes(key)) {
      diff.status = 'deleted';
      diff.value = isObject1 ? _.cloneDeep(object1[key]) : object1[key];
    } else {
      diff.status = 'added';
      diff.value = isObject2 ? _.cloneDeep(object2[key]) : object2[key];
    }
    acc.push(diff);
    return acc;
  }, []);
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
