import { isObject } from '../src/utils.js';

const printValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const plain = (difference, nameObject = '') => {
  const sorted = difference.sort(({ name: key1 }, { name: key2 }) => {
    if (key1 < key2) {
      return -1;
    } if (key1 > key2) {
      return 1;
    }
    return 0;
  });
  const result = sorted.flatMap((object) => {
    const { name } = object;
    const printedName = nameObject.length > 0 ? `${nameObject}.${name}` : name;
    const previous = printValue(object.previous);
    const value = printValue(object.value);
    switch (object.status) {
      case 'added':
        return `Property '${printedName}' was added with value: ${value}`;
      case 'deleted':
        return `Property '${printedName}' was removed`;
      case 'changed':
        return `Property '${printedName}' was updated. From ${previous} to ${value}`;
      case 'unchanged':
        return '';
      default:
        return plain(object.children, printedName);
    }
  }).filter((string) => string !== '').join('\n');
  return result;
};

export default plain;
