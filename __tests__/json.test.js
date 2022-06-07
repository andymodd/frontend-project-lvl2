import { getFixturePath, readFile } from '../src/utils.js';
import gendiff from '../src/index.js';

test('test formatter json', () => {
  const json = getFixturePath('file1.json');
  const yaml = getFixturePath('file2.yml');
  const jsonExpected = readFile(getFixturePath('json'));
  expect(gendiff(json, yaml, 'json')).toBe(jsonExpected);
});
