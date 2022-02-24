import events from 'events'
const eventEmitter = new events.EventEmitter()

class Observer {
  on(key: any, func: any) {
    eventEmitter.on(key, func)
  }

  emit(key: any, object: any) {
    eventEmitter.emit(key, object)
  }

  removeListener(key: any, func: any) {
    eventEmitter.removeListener(key, func)
  }
}

const instance = new Observer()
Object.freeze(instance)

export default instance
