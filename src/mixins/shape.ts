import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import { Dictionary } from '../declarations'

import drawingStateMixin from './drawing-state'
import propsUpdatedMixin from './props-updated'
import { assert } from '../utils'

interface ShapeMixin extends Vue {
  _prevData: any
  eventBus: Vue
  shouldRerender (prev: Dictionary<any>, next: Dictionary<any>): boolean
  findEventBus (target: Vue | undefined): Vue
}

export default {
  mixins: [drawingStateMixin, propsUpdatedMixin],

  propsUpdated (newProps, oldProps) {
    this.eventBus.$emit('update')
  },

  computed: {
    eventBus (): Vue {
      return this.findEventBus(this)
    }
  },

  methods: {
    findEventBus (this: ShapeMixin, target: Vue | undefined): Vue {
      assert(
        target !== undefined,
        `<${this._componentTag}> must be descendant of a context component`
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
    // always return empty node
    return h()
  }
} as ComponentOptions<ShapeMixin>
