import * as assert from 'power-assert'
import * as sinon from 'sinon'
import * as Vue from 'vue'
import contextElementMixin from '../../src/mixins/context-element'

describe('Context Element Mixin', () => {
  const render = (h: any) => h()
  const mockCtx: any = {
    canvas: { width: 0, height: 0 },
    clearRect () {}
  }

  it('observes all updates and renders only once', done => {
    const vm: any = new Vue({
      mixins: [contextElementMixin],
      canvas: {
        getContext: () => mockCtx
      },
      render
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

  it('renders all children', done => {
    const spy1 = sinon.spy()
    const spy2 = sinon.spy()

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

    const Context = {
      mixins: [contextElementMixin],
      canvas: {
        getContext: () => mockCtx
      },
      render (h: any) {
        return h('canvas', this.$slots.default)
      }
    }

    const vm: any = new Vue({
      render: h => h(Context, [
        h(Child1),
        h(Child2)
      ])
    }).$mount()

    Vue.nextTick(() => {
      assert(spy1.called)
      assert(spy2.called)
      done()
    })
  })
})
