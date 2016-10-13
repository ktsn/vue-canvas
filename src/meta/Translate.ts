import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import notifyMixin from '../mixins/notify'

interface TranslateMixin extends Vue {
  x: number
  y: number
}

export default {
  mixins: [notifyMixin],

  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },

  canvas: {
    applyDrawingState (ctx) {
      ctx.translate(this.x, this.y)
    }
  },

  render (h) {
    return h('span', this.$slots['default'])
  }
} as ComponentOptions<TranslateMixin>