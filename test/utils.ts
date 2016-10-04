import * as assert from 'power-assert'
import * as Vue from 'vue'
import { throttledTick, merge, shallowEqual } from '../src/utils'

describe('utils', () => {
  it('merge', () => {
    const actual = merge({ a: 1, b: 2 }, { b: 3, c: 4 })
    assert.deepStrictEqual(actual, {
      a: 1,
      b: 3,
      c: 4
    })
  })

  it('shallowEqual: same object', () => {
    const objA = { a: 1 }
    const objB = objA
    assert(shallowEqual(objA, objB))
  })

  it('shallowEqual: different values', () => {
    const objA = { a: 1 }
    const objB = { b: 2 }
    assert(!shallowEqual(objA, objB))
  })

  it('shallowEqual: different nested objects', () => {
    const objA = { a: 1, b: { c: 1 }}
    const objB = { a: 1, b: { c: 1 }}
    assert(!shallowEqual(objA, objB))
  })

  it('throttledTick', done => {
    let count = 0
    function fn () {
      count++
    }
    throttledTick(fn)
    throttledTick(fn)
    throttledTick(fn)

    Vue.nextTick(() => {
      assert(count === 1)

      throttledTick(fn)
      throttledTick(fn)

      Vue.nextTick(() => {
        assert(count === 2)
        done()
      })
    })
  })
})
