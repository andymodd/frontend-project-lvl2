import { getFixturePath, readFile } from '../src/utils.js';
import gendiff from '../src/index.js';

test('test gendiff function for json files', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const expected = readFile(getFixturePath('expected'));
  expect(gendiff(json1, json2)).toBe(expected);
});

test('test gendiff function for yml files', () => {
  const yaml1 = getFixturePath('file1.yml');
  const yaml2 = getFixturePath('file2.yml');
  const expected = readFile(getFixturePath('expected'));
  expect(gendiff(yaml1, yaml2)).toBe(expected);
});

test('test formatter plain', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const plainExpected = readFile(getFixturePath('plain'));
  expect(gendiff(json1, json2, 'plain')).toBe(plainExpected);
});

test('test formatter json', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const jsonExpected = readFile(getFixturePath('json'));
  expect(gendiff(json1, json2, 'json')).toBe(jsonExpected);
});