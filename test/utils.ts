import * as assert from 'power-assert'
import * as Vue from 'vue'
import { throttledTick, merge } from '../src/utils'

describe('utils', () => {
  it('merge', () => {
    const actual = merge({ a: 1, b: 2 }, { b: 3, c: 4 })
    assert.deepStrictEqual(actual, {
      a: 1,
      b: 3,
      c: 4
    })
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
