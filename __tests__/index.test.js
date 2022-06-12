/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = getFixturePath('file1.json');
const yamlFile2 = getFixturePath('file2.yml');
const expected = readFile('expected');
const plainExpected = readFile('plainExpected');
const jsonExpected = readFile('jsonExpected');

/* firstArgument, secondArgument, thirdArgument, expectedArgument */
const cases = [
  [jsonFile1, yamlFile2, 'stylish', expected],
  [jsonFile1, yamlFile2, 'plain', plainExpected],
  [jsonFile1, yamlFile2, 'json', jsonExpected],
];

test.each(cases)('gendiff function and three different formatters', (firstArgument, secondArgument, thirdArgument, expectedArgument) => {
  expect(gendiff(firstArgument, secondArgument, thirdArgument)).toBe(expectedArgument);
});
