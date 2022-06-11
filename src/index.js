import parse from './parsers.js';
import chooseFormatter from '../formatters/index.js';
import compareObjects from './compareObjects.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const diff = compareObjects(file1, file2);
  const formatter = chooseFormatter(formatName);
  return formatter(diff);
};

export default gendiff;
