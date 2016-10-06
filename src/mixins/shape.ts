import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import { Dictionary } from '../declarations'

import { shallowEqual, assert } from '../utils'

interface ShapeMixin extends Vue {
  _prevData: any
  eventBus: Vue
  shouldRerender (prev: Dictionary<any>, next: Dictionary<any>): boolean
  findEventBus (target: Vue | undefined): Vue
}

export default {
  created () {
    this._prevData = this.$options.propsData
  },

  updated () {
    const data: { [key: string]: any } = this.$options.propsData!

    if (this.shouldRerender(this._prevData, data)) {
      this.eventBus.$emit('update')
    }

    this._prevData = data
  },

  computed: {
    eventBus (): Vue {
      return this.findEventBus(this)
    }
  },

  methods: {
    shouldRerender (prev: Dictionary<any>, next: Dictionary<any>): boolean {
      return shallowEqual(prev, next)
    },

    findEventBus (this: ShapeMixin, target: Vue | undefined): Vue {
      assert(
        target !== undefined,
        `<${this._contentTag}> must be descendant of a context component`
      )
      const parent: Vue & { eventBus?: Vue } = target!.$parent

      if (parent.eventBus) {
        return parent.eventBus
      }

      return this.findEventBus(parent)
    }
  },

  canvas: {
    render () {
      assert(false, 'must be implemented canvas render function')
    }
  },

  render (h) {
    // touch all props data to add deps
    const options: any = this.$options
    options._propKeys.forEach((key: string) => (this as any)[key])

    // always return empty node
    return h()
  }
} as ComponentOptions<ShapeMixin>
