import storeRedux from 'state'
export default class ReduxServices {
  static async callDispatchAction(action: any) {
    storeRedux.dispatch(action)
  }
}
