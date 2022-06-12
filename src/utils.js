/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

const isObject = (obj) => obj != null && obj.constructor.name === 'Object';


export { getFixturePath, readFile, isObject };
