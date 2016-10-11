
import TutorialElementType from '../enums/TutorialElementType';

var initialTimeState = {
  elements: [{
    id: 1,
    type: TutorialElementType.TEXT.value,
    text: '请输入内容',
    isEditing: false
  }]
}

export function _tutorial(state = initialTimeState, action) {

  console.log('_tutorial state:', state, 'action:', action);
  let elements = state.elements;
  const index = elements.findIndex((e) => e.id === action.id);

  switch (action.type) {
    case 'ADD_ELEMENT':
      if (action.elementType === TutorialElementType.TEXT.value) {
        elements.splice(index, 0, {
          id: action.elementId,
          type: action.elementType,
          text: '请输入内容',
          isEditing: false
        });
      } else if(action.elementType === TutorialElementType.IMAGE.value) {
        elements.splice(index, 0, {
          id: action.elementId,
          type: action.elementType,
          url: '/默认图片路径',
          isEditing: false
        });
      }

      elements = elements.concat([]);
      return {elements};
    case 'EDIT_START_ELEMENT':
      elements[index].isEditing = true;
      elements = elements.concat([]);
      return {elements};
    case 'EDIT_DONE_ELEMENT':
      let element = elements[index];
      element.isEditing = false;
      if (action.elementType === TutorialElementType.TEXT.value) {
        element.text = action.value;
      } else if(action.elementType === TutorialElementType.IMAGE.value) {
        element.url = action.value;
      }
      elements = elements.concat([]);
      return {elements};
    case 'REMOVE_ELEMENT':
      if(elements.length > 1) {
        elements.splice(index, 1);
        elements = elements.concat([]);
      }
      return {elements};
    case 'UP_ELEMENT':
      if(index >= 1) {
        elements.splice(index - 1, 2, elements[index], elements[index - 1]);
        elements = elements.concat([]);
      }
      return {elements};
    case 'DOWN_ELEMENT':
      if(index < elements.length) {
        elements.splice(index, 2, elements[index + 1], elements[index]);
        elements = elements.concat([]);
      }
      return {elements};
    case 'ELEMENT_TEXT_CHANGE':
      elements[index].text = action.value;
      elements = elements.concat([]);
      return {elements};
    default:
      return state
  }
}
