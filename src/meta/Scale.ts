import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import notifyMixin from '../mixins/notify'

interface ScaleMixin extends Vue {
  x: number
  y: number
}

export default {
  mixins: [notifyMixin],

  props: {
    x: {
      type: Number,
      default: 1
    },
    y: {
      type: Number,
      default: 1
    }
  },

  canvas: {
    applyDrawingState (ctx) {
      ctx.scale(this.x, this.y)
    }
  },

  render (h) {
    return h('span', this.$slots['default'])
  }
} as ComponentOptions<ScaleMixin>