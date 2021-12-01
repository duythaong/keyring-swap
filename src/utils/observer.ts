/* eslint-disable @typescript-eslint/no-var-requires */
const events = require('events')
const eventEmitter = new events.EventEmitter()

class Observer {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  on(key: any, func: any) {
    eventEmitter.on(key, func)
  }

  emit(key: any, object?: any) {
    eventEmitter.emit(key, object)
  }

  removeListener(key: any, func: any) {
    eventEmitter.removeListener(key, func)
  }
}

const instance = new Observer()
Object.freeze(instance)

export default instance
