import { getFixturePath, readFile } from '../src/utils.js';
import gendiff from '../src/index.js';

test('examine gendiff function with default stylish format', () => {
  const json = getFixturePath('file1.json');
  const yaml = getFixturePath('file2.yml');
  const expected = readFile(getFixturePath('expected'));
  expect(gendiff(json, yaml)).toBe(expected);
});
