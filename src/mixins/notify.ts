import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import propsUpdatedMixin from './props-updated'
import { assert } from '../utils'

interface NotifyMixin extends Vue {
  eventBus: Vue
  findEventBus (target: Vue & { _eventBus?: Vue }): Vue
}

export default {
  mixins: [propsUpdatedMixin],

  propsUpdated (newProps, oldProps) {
    this.eventBus.$emit('update')
  },

  computed: {
    eventBus (): Vue {
      return this.findEventBus(this)
    }
  },

  methods: {
    findEventBus (this: NotifyMixin, target: Vue & { _eventBus?: Vue }): Vue {
       if (target._eventBus) {
        return target._eventBus
      }

      const parent = target.$parent
      assert(
        parent !== undefined,
        `<${this._componentTag}> must be descendant of a context component`
      )

      return this.findEventBus(parent)
    }
  }
} as ComponentOptions<NotifyMixin>