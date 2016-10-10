/*
TutorialElementType
*/

import {Enum} from 'enumify';

export default class TutorialElementType extends Enum {
  static get(value) {
    return TutorialElementType.enumValues.find(item => item.value === value)
  }
}

TutorialElementType.initEnum({
  TEXT: {
    value: 1,
    description: '文本',
  },
  IMAGE: {
    value: 2,
    description: '图片',
  },
});
