import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parsers.js';
import compareObjects from './compareObjects.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const file1 = parse(fs.readFileSync(filepath1), extension1);
  const file2 = parse(fs.readFileSync(filepath2), extension2);
  const diff = compareObjects(file1, file2);
  const preferredFormatOutput = format(formatName, diff);
  return preferredFormatOutput;
};

export default gendiff;
