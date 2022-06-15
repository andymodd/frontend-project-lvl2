import yaml from 'js-yaml';

const parse = (string, extension) => {
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(string);
  }
  return JSON.parse(string);
};

export default parse;
