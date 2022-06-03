import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parse = (filepath) => {
  const extension = path.extname(filepath);
  const file = fs.readFileSync(filepath);
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(file);
  }
  return JSON.parse(file);
};

export default parse;
