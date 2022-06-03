import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormatter = (formatName) => {
  if (formatName === 'stylish') {
    return stylish;
  }
  if (formatName === 'plain') {
    return plain;
  }
  if (formatName === 'json') {
    return json;
  }
  throw new Error('Unexpected formatter');
};

export default chooseFormatter;
