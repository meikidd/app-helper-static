
const Enum = require('enumify').Enum;

class Device extends Enum {
  static get(value) {
    return Device.enumValues.find(item => item.value === value);
  }
}

Device.initEnum({
  PHONE: {
    value: 'phone',
    description: '手机',
  },
  PAD: {
    value: 'pad',
    description: '平板',
  },
  PC: {
    value: 'pc',
    description: '电脑',
  },
});

module.exports = Device;
