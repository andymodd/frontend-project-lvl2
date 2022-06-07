import { getFixturePath, readFile } from '../src/utils.js';
import gendiff from '../src/index.js';

test('test formatter plain', () => {
  const json = getFixturePath('file1.json');
  const yaml = getFixturePath('file2.yml');
  const plainExpected = readFile(getFixturePath('plain'));
  expect(gendiff(json, yaml, 'plain')).toBe(plainExpected);
});
