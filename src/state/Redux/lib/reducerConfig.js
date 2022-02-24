import { getDataLocal } from 'common/function'

export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const checkLocalStoreToRedux = (storeRedux, keyStoreNew, action, initData) => {
  return new Promise((resolve) => {
    try {
      let data = getDataLocal(keyStoreNew)
      if (data) {
        data !== initData && storeRedux.dispatch(action(data))
      }
      resolve()
    } catch (error) {
      return resolve()
    }
  })
}
