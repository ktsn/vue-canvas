import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import { Dictionary } from '../declarations'

import { shallowEqual, assert } from '../utils'

interface RenderingElementMixin extends Vue {
  _prevData: any
  eventBus: Vue
  shouldRerender (prev: Dictionary<any>, next: Dictionary<any>): boolean
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
      return findEventBus(this)
    }
  },

  methods: {
    shouldRerender (prev: Dictionary<any>, next: Dictionary<any>): boolean {
      return shallowEqual(prev, next)
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
} as ComponentOptions<RenderingElementMixin>


function findEventBus (target: Vue | undefined): Vue {
  assert(
    target !== undefined,
    `<${(target as any)._contentTag}> must be descendant of a context component`
  )
  const parent: Vue & { eventBus?: Vue } = target!.$parent

  if (parent.eventBus) {
    return parent.eventBus
  }

  return findEventBus(parent)
}
