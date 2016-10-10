
import TutorialElementType from '../enums/TutorialElementType';

var initialTimeState = {
  elements: [{
    id: 1,
    type: TutorialElementType.TEXT.value,
    text: '请输入内容',
  }]
}

export function _tutorial(state = initialTimeState, action) {

  console.log('_tutorial state:', state, 'action:', action);

  switch (action.type) {
    case 'ADD_ELEMENT_AFTER':
      const index = state.elements.findIndex((e) => e.id === action.id);
      if (action.elementType === TutorialElementType.TEXT.value) {
        state.elements.splice(index, 0, {
          id: action.elementId,
          type: action.elementType,
          text: '请输入文本内容',
        });
      } else if(action.elementType === TutorialElementType.IMAGE.value) {
        state.elements.splice(index, 0, {
          id: action.elementId,
          type: action.elementType,
          url: '/默认图片路径'
        });
      }

      state.elements = state.elements.concat([]);
      return {
        ...state,
      }
    default:
      return state
  }
}
