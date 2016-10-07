import * as assert from 'power-assert'
import * as sinon from 'sinon'
import * as Vue from 'vue'
import contextMixin from '../../src/mixins/context'
import { MockCtx } from '../helpers/mock-ctx'

describe('Context Mixin', () => {
  const render = (h: any) => h()
  const mockCtx: any = new MockCtx()

  it('mount canvas element with specifying width and height', () => {
    const vm = new Vue({
      mixins: [contextMixin],
      propsData: {
        width: 500,
        height: 400
      },
      canvas: {
        getContext: () => mockCtx
      }
    }).$mount()

    const el: any = vm.$el
    assert(el instanceof HTMLCanvasElement)
    assert(el.width === 500)
    assert(el.height === 400)
  })

  it('observes all updates and renders only once', done => {
    const vm: any = new Vue({
      mixins: [contextMixin],
      canvas: {
        getContext: () => mockCtx
      }
    })

    const spy = sinon.spy(vm, 'render')

    vm.$mount()

    Vue.nextTick(() => {
      assert(spy.callCount === 1)

      vm.eventBus.$emit('update')
      vm.eventBus.$emit('update')

      Vue.nextTick(() => {
        assert(spy.callCount === 2)
        done()
      })
    })
  })
})
