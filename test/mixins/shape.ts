import * as assert from 'power-assert'
import * as sinon from 'sinon'
import * as Vue from 'vue'
import shapeMixin from '../../src/mixins/shape'

describe('Shape Mixin', () => {
  it('must dispatch update event to context', done => {
    const Target = {
      mixins: [shapeMixin],
      props: {
        test: Number
      }
    }

    const vm: any = new Vue({
      data: {
        test: 1
      },
      render (this: any, h) {
        return h(Target, { props: { test: this.test }})
      }
    }).$mount()

    // dependent event bus
    vm.eventBus = new Vue()
    const spy = sinon.spy()
    vm.eventBus.$on('update', spy)

    vm.test = 2
    Vue.nextTick(() => {
      assert(spy.called)
      done()
    })
  })

  it('does not notify update if there are no props update', done => {
    const Target = {
      mixins: [shapeMixin],
      props: {
        test: Number
      }
    }

    const vm: any = new Vue({
      data: {
        test: 1
      },
      render (this: any, h) {
        return h(Target, { props: { test: this.test }})
      }
    }).$mount()

    // dependent event bus
    vm.eventBus = new Vue()
    const spy = sinon.spy()
    vm.eventBus.$on('update', spy)

    vm.test = 1
    Vue.nextTick(() => {
      assert(!spy.called)
      done()
    })
  })
})