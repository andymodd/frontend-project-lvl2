import { getFixturePath, readFile } from '../src/utils.js';
import gendiff from '../src/index.js';

test('test gendiff function with default stylish format', () => {
  const json = getFixturePath('file1.json');
  const yaml = getFixturePath('file2.yml');
  const expected = readFile(getFixturePath('expected'));
  expect(gendiff(json, yaml)).toBe(expected);
});

test('test formatter plain', () => {
  const json = getFixturePath('file1.json');
  const yaml = getFixturePath('file2.yml');
  const plainExpected = readFile(getFixturePath('plain'));
  expect(gendiff(json, yaml, 'plain')).toBe(plainExpected);
});

test('test formatter json', () => {
  const json = getFixturePath('file1.json');
  const yaml = getFixturePath('file2.yml');
  const jsonExpected = readFile(getFixturePath('json'));
  expect(gendiff(json, yaml, 'json')).toBe(jsonExpected);
});
