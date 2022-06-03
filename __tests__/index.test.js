import { getFixturePath, readFile } from '../src/utils.js';
import gendiff from '../src/index.js';

let json1;
let json2;
let yaml1;
let yaml2;

beforeEach(() => {
  json1 = getFixturePath('file1.json');
  json2 = getFixturePath('file2.json');
  yaml1 = getFixturePath('file1.yml');
  yaml2 = getFixturePath('file2.yml');
});

test('test gendiff function for json files', () => {
  json1 = getFixturePath('file1.json');
  json2 = getFixturePath('file2.json');
  const expected = readFile(getFixturePath('expected'));
  expect(gendiff(json1, json2)).toBe(expected);
});

test('test gendiff function for yml files', () => {
  yaml1 = getFixturePath('file1.yml');
  yaml2 = getFixturePath('file2.yml');
  const expected = readFile(getFixturePath('expected'));
  expect(gendiff(yaml1, yaml2)).toBe(expected);
});

test('test formatter plain', () => {
  json1 = getFixturePath('file1.json');
  json2 = getFixturePath('file2.json');
  const plainExpected = readFile(getFixturePath('plain'));
  expect(gendiff(json1, json2, 'plain')).toBe(plainExpected);
});

test('test formatter json', () => {
  json1 = getFixturePath('file1.json');
  json2 = getFixturePath('file2.json');
  const jsonExpected = readFile(getFixturePath('json'));
  expect(gendiff(json1, json2, 'json')).toBe(jsonExpected);
});
