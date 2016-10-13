import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import notifyMixin from '../mixins/notify'

interface RotateMixin extends Vue {
  angle: number
}

export default {
  mixins: [notifyMixin],

  props: {
    angle: {
      type: Number,
      required: true
    }
  },

  canvas: {
    applyDrawingState (ctx) {
      ctx.rotate(this.angle)
    }
  },

  render (h) {
    return h('span', this.$slots['default'])
  }
} as ComponentOptions<RotateMixin>