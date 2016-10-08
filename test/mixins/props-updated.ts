import * as assert from 'power-assert'
import * as sinon from 'sinon'
import * as Vue from 'vue'
import propsUpdatedMixin from '../../src/mixins/props-updated'

describe('Props Updated Mixin', () => {
  const render = h => h()

  it('call propsUpdated hook when props are updated', done => {
    const Component = {
      mixins: [propsUpdatedMixin],
      props: {
        test: Number
      },
      propsUpdated () {
        done()
      },
      render
    }

    const vm: any = new Vue({
      data: {
        test: 1
      },
      render (this: any, h) {
        return h(Component, {
          props: {
            test: this.test
          }
        })
      }
    }).$mount()

    vm.test = 2
  })

  it('call the hook even if a prop is undefined initially', done => {
    const Component = {
      mixins: [propsUpdatedMixin],
      props: {
        test: Number
      },
      propsUpdated () {
        done()
      },
      render
    }

    const vm: any = new Vue({
      data: {
        test: null
      },
      render (this: any, h) {
        let data = {}
        if (this.test !== null) {
          data = {
            props: {
              test: this.test
            }
          }
        }
        return h(Component, data)
      }
    }).$mount()

    vm.test = 1
  })

  it('does not call if props are not updated', done => {
    const Component = {
      mixins: [propsUpdatedMixin],
      props: {
        test: Number
      },
      propsUpdated () {
        assert.fail()
      },
      render
    }

    const vm: any = new Vue({
      data: {
        test: 1
      },
      render (this: any, h) {
        return h(Component, {
          props: {
            test: this.test
          }
        })
      }
    }).$mount()

    vm.test = 1
    Vue.nextTick(() => {
      done()
    })
  })

  it('passes prev and next props', done => {
    const Component = {
      mixins: [propsUpdatedMixin],
      props: {
        test: Number
      },
      propsUpdated (newProps, oldProps) {
        assert(oldProps.test === 1)
        assert(newProps.test === 2)
        done()
      },
      render
    }

    const vm: any = new Vue({
      data: {
        test: 1
      },
      render (this: any, h) {
        return h(Component, {
          props: {
            test: this.test
          }
        })
      }
    }).$mount()

    vm.test = 2
  })

  it('calls up to once in same tick', done => {
    const spy = sinon.spy()
    const Component = {
      mixins: [propsUpdatedMixin],
      props: {
        foo: String,
        bar: String
      },
      propsUpdated: spy,
      render
    }

    const vm: any = new Vue({
      data: {
        foo: 'foo',
        bar: 'bar'
      },
      render (this: any, h) {
        return h(Component, {
          props: {
            foo: this.foo,
            bar: this.bar
          }
        })
      }
    }).$mount()

    vm.foo = 'foofoo'
    vm.bar = 'barbar'

    Vue.nextTick(() => {
      assert(spy.callCount === 1)
      assert.deepStrictEqual(spy.lastCall.args, [
        { foo: 'foofoo', bar: 'barbar' },
        { foo: 'foo', bar: 'bar' }
      ])
      done()
    })
  })
})