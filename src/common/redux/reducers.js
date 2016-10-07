
var initialTimeState = {
  tutorials: [],
  loading: false
}

export function _tutorial(state = initialTimeState, action) {

  console.log('_tutorial state:', state, 'action:', action);

  switch (action.type) {
    case 'POST_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'POST_SUCCESS':
      return Object.assign({}, {
        ...state,
        tutorials: action.result.tutorials,
        loading: false
      })
    case 'POST_FAILURE':
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
