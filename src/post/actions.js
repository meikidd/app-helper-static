
export function addElementAfter(id, elementType) {
  return {
    type: 'ADD_ELEMENT_AFTER',
    id,
    elementId: Date.now(),
    elementType: elementType.value
  }
}

export function addElementBefore(id, elementType) {
  return {
    type: 'ADD_ELEMENT_BEFORE',
    id,
    elementId: Date.now(),
    elementType: elementType.value
  }
}
