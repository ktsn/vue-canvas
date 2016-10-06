import * as assert from 'power-assert'
import * as sinon from 'sinon'
import * as Vue from 'vue'
import { Renderer } from '../src/renderer'

describe('Renderer', () => {
  const render = h => h()

  it('renders all children', done => {
    const mockCtx: any = {}
    const renderer = new Renderer(mockCtx)

    const spy1 = sinon.spy()
    const spy2 = sinon.spy()
    const spy3 = sinon.spy()

    const Child1 = {
      canvas: {
        render: spy1
      },
      render
    }

    const Child2 = {
      canvas: {
        render: spy2
      },
      render
    }

    const vm = new Vue({
      canvas: {
        render: spy3
      },
      render: h => h('canvas', [
        h(Child1),
        h(Child2)
      ])
    }).$mount()

    Vue.nextTick(() => {
      renderer.render(vm)

      assert(spy1.called)
      assert(spy2.called)
      assert(spy3.called)

      done()
    })
  })
})