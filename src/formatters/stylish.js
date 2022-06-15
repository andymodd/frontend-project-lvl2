import _ from 'lodash';
import isObject from '../utils.js';

const iter = (currentValue, indentSize, depth) => {
  if (!isObject(currentValue)) {
    return `${currentValue}`;
  }
  const currentIndent = depth * indentSize;
  const bracketIndent = currentIndent - indentSize;
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${' '.repeat(currentIndent)}${key}: ${iter(val, indentSize, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${' '.repeat(bracketIndent)}}`,
  ].join('\n');
};

const stylish = (keys, depth = 1) => {
  const sortedKeys = _.sortBy(keys, (object) => object.name);
  const indentSize = 4;
  const currentIndent = depth * indentSize;
  const bracketIndent = currentIndent - indentSize;
  const diff = sortedKeys.flatMap((key) => {
    switch (key.status) {
      case 'deleted':
        return [`${'- '.padStart(currentIndent, ' ')}${key.name}: ${iter(key.value, indentSize, depth + 1)}`];
      case 'added':
        return [`${'+ '.padStart(currentIndent, ' ')}${key.name}: ${iter(key.value, indentSize, depth + 1)}`];
      case 'unchanged':
        return [`${'  '.padStart(currentIndent, ' ')}${key.name}: ${iter(key.value, indentSize, depth + 1)}`];
      case 'changed':
        return [`${'- '.padStart(currentIndent, ' ')}${key.name}: ${iter(key.previous, indentSize, depth + 1)}`, `${'+ '.padStart(currentIndent, ' ')}${key.name}: ${iter(key.value, indentSize, depth + 1)}`];
      default:
        return [`${'  '.padStart(currentIndent, ' ')}${key.name}: ${stylish(key.children, depth + 1)}`];
    }
  }).join('\n');
  return `{\n${diff}\n${' '.repeat(bracketIndent)}}`;
};

export default stylish;
