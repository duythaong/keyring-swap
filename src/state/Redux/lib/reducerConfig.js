import { getDataLocal } from 'common/function'

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
