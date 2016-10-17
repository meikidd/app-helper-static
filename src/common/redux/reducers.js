
import TutorialElementType from '../enums/TutorialElementType';

var initialTimeState = {
  creator: 'meiqingguang',
  title: '',
  device: 'phone',
  os: 'ios',
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
    case 'ELEMENT_ADD_TEXT':
        elements.splice(index, 0, {
          id: action.elementId,
          type: action.elementType,
          text: '请输入内容',
          isEditing: false
        });

      elements = elements.concat([]);
      return {...state, elements};
    case 'ELEMENT_ADD_IMAGE':
    case 'ELEMENT_ADD_TEXT':
        elements.splice(index, 0, {
          id: action.elementId,
          type: action.elementType,
          url: action.value,
          isEditing: false
        });

      elements = elements.concat([]);
      return {...state, elements};
    case 'ELEMENT_EDIT_START':
      elements[index].isEditing = true;
      elements = elements.concat([]);
      return {...state, elements};
    case 'ELEMENT_EDIT_DONE':
      let element = elements[index];
      element.isEditing = false;
      if (action.elementType === TutorialElementType.TEXT.value) {
        element.text = action.value;
      } else if(action.elementType === TutorialElementType.IMAGE.value) {
        element.url = action.value;
      }
      elements = elements.concat([]);
      return {...state, elements};
    case 'ELEMENT_REMOVE':
      if(elements.length > 1) {
        elements.splice(index, 1);
        elements = elements.concat([]);
      }
      return {...state, elements};
    case 'ELEMENT_UP':
      if(index >= 1) {
        elements.splice(index - 1, 2, elements[index], elements[index - 1]);
        elements = elements.concat([]);
      }
      return {...state, elements};
    case 'ELEMENT_DOWN':
      if(index < elements.length && elements.length > 1) {
        elements.splice(index, 2, elements[index + 1], elements[index]);
        elements = elements.concat([]);
      }
      return {...state, elements};
    case 'ELEMENT_TEXT_CHANGE':
      elements[index].text = action.value;
      elements = elements.concat([]);
      return {...state, elements};
    case 'TITLE_CHANGE':
      return {...state, title: action.value};
    default:
      return state
  }
}
