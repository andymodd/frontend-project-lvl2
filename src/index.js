import format from './formatters/index.js';
import parse from './parsers.js';
import compareObjects from './compareObjects.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const diff = compareObjects(file1, file2);
  const preferredFormatOutput = format(formatName, diff);
  return preferredFormatOutput;
};

export default gendiff;
