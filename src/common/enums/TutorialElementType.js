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
    value: 'text',
    description: '文本',
  },
  IMAGE: {
    value: 'image',
    description: '图片',
  },
});
