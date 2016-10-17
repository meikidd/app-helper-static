export default {
  addTextElement : (id, elementType) => {
    return {
      id,
      type: 'ELEMENT_ADD_TEXT',
      elementId: Date.now(),
      elementType: elementType.value
    }
  },
  addImageElement : (id, elementType, url) => {
    return {
      id,
      value: url,
      type: 'ELEMENT_ADD_IMAGE',
      elementId: Date.now(),
      elementType: elementType.value,
    }
  },
  editStartElement : (id) => {
    return {
      id,
      type: 'ELEMENT_EDIT_START',
    }
  },
  editDoneElement : (id, value) => {
    return {
      id,
      value,
      type: 'ELEMENT_EDIT_DONE',
    }
  },
  removeElement : (id) => {
    return {
      id,
      type: 'ELEMENT_REMOVE',
    }
  },
  upElement : (id) => {
    return {
      id,
      type: 'ELEMENT_UP',
    }
  },
  downElement : (id) => {
    return {
      id,
      type: 'ELEMENT_DOWN',
    }
  },
  textChange : (id, value) => {
    return {
      id,
      value,
      type: 'ELEMENT_TEXT_CHANGE'
    }
  },
  titleChange : (value) => {
    return {
      value,
      type: 'TITLE_CHANGE'
    }
  }
}
