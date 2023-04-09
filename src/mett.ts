const executeAndCatchError = (callback: () => void): void => {
  try {
    callback()
  } catch (e) {
    console.error(e)
  }
}

export type Listener<Value> = (value: Value) => void
export type Dispose = () => void
export type Emitter<Value> = {
  /**
   * The last emitted value.
   */
  readonly lastEmittedValue?: Value
  /**
   * Listen to the event.
   * @return a dispose function.
   */
  listen(listener: Listener<Value>): Dispose,
  /**
   * Emit a value.
   */
  emit(value: Value): void
}
export type MitOptions<Value> = {
  /**
   * The initialValue of the event emitter.
   * Will be emitted on the listen if `replayLast` is `true`
   */
  initialValue?: Value,
  /**
   * Emit to newly added listener the `lastEmittedValue`.
   */
  replayLast?: boolean,
}
const mett = <Value>(options: MitOptions<Value> = {}): Emitter<Value>  => {
  const listeners: Listener<Value>[] = []
  let lastEmittedValue = options.initialValue
  return {
    get lastEmittedValue() {
      return lastEmittedValue
    },
    emit(value) {
      lastEmittedValue = value
      listeners.forEach((listener) => {
        executeAndCatchError(() => listener(value))
      })
    },
    listen(listener: Listener<Value>) {
      if (options.replayLast) {
        executeAndCatchError(() => listener(lastEmittedValue))
      }
      listeners.push(listener)
      return () => {
        listeners.splice(listeners.indexOf(listener), 1)
      }
    }
  }
}

export default mett