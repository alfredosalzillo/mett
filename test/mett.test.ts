import mett from "../src/mett";

describe('a mett event emitter', () => {
  it('should have a listen function', () => {
    const emitter = mett()
    expect(emitter.listen).toBeInstanceOf(Function)
  })
  it('should have an emit function', () => {
    const emitter = mett()
    expect(emitter.emit).toBeInstanceOf(Function)
  })
  it('should allow to dispose listeners', () => {
    const emitter = mett()
    const listener = jest.fn()
    const dispose = emitter.listen(listener)
    expect(dispose).toBeInstanceOf(Function)
  })
  it('should not call listeners if disposed', () => {
    const emitter = mett()
    const listener = jest.fn()
    const dispose = emitter.listen(listener)
    dispose()
    emitter.emit(1)
    expect(listener).not.toBeCalledWith(1)
  })
  it('should emit a value', () => {
    const emitter = mett()
    const listener = jest.fn()
    emitter.listen(listener)
    emitter.emit(1)
    expect(listener).toBeCalledWith(1)
  })
  it('should emit the last emitted value when a new listener is added if replyLast is true', () => {
    const emitter = mett({
      replayLast: true,
    })
    const listener = jest.fn()
    emitter.emit(1)
    emitter.listen(listener)
    expect(listener).toBeCalledWith(1)
  })
  it('should not emit the last emitted value when a new listener is added if replyLast is not true', () => {
    const emitter = mett({
      replayLast: false,
    })
    const listener = jest.fn()
    emitter.emit(1)
    emitter.listen(listener)
    expect(listener).not.toBeCalled()
  })
  it('should not throw if a lister throw error', () => {
    const emitter = mett()
    const listener = () => {
      throw new Error()
    }
    emitter.listen(listener)
    emitter.emit(1)
    expect(() => emitter.emit(1)).not.toThrow()
  })
  it('should save the initialValue', () => {
    const emitter = mett({
      initialValue: 1,
    })
    expect(emitter.lastEmittedValue).toBe(1)
  })
})