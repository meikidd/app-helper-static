
const Enum = require('enumify').Enum;

class OS extends Enum {
  static get(value) {
    return OS.enumValues.find(item => item.value === value);
  }
}

OS.initEnum({
  IOS: {
    value: 'ios',
    description: '苹果',
  },
  ANDROID: {
    value: 'android',
    description: '安卓',
  },
  WINDOWS: {
    value: 'windows',
    description: 'Windows',
  },
});

module.exports = OS;
