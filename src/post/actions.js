export default {
  addElement : (id, elementType) => {
    return {
      id,
      type: 'ADD_ELEMENT',
      elementId: Date.now(),
      elementType: elementType.value
    }
  },
  editStartElement : (id) => {
    return {
      id,
      type: 'EDIT_START_ELEMENT',
    }
  },
  editDoneElement : (id, value) => {
    return {
      id,
      value,
      type: 'EDIT_DONE_ELEMENT',
    }
  },
  removeElement : (id) => {
    return {
      id,
      type: 'REMOVE_ELEMENT',
    }
  },
  upElement : (id) => {
    return {
      id,
      type: 'UP_ELEMENT',
    }
  },
  downElement : (id) => {
    return {
      id,
      type: 'DOWN_ELEMENT',
    }
  },
  textChange : (id, value) => {
    return {
      id,
      value,
      type: 'ELEMENT_TEXT_CHANGE'
    }
  }
}
