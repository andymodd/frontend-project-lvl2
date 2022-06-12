import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (formatName, difference) => {
  switch (formatName) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return plain(difference);
    case 'json':
      return json(difference);
    default:
      throw new Error('Unexpected formatter');
  }
};

export default format;
