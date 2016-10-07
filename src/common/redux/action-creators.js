import Promise from 'bluebird'

export function post() {
  return {
    types: ['POST_REQUEST', 'POST_SUCCESS', 'POST_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const d = new Date()
          const ms = ('000' + d.getMilliseconds()).slice(-3)
          resolve({
            tutorials: [{id:1, title:'hei i\'am new tutorial'}]
          })
        }, 1000)
      })
    }
  }
}
