import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import notifyMixin from '../mixins/notify'

interface TransformMixin extends Vue {
  matrix: number[]
}

export default {
  mixins: [notifyMixin],

  props: {
    matrix: {
      type: Array,
      required: true,
      validator (value) {
        return value.length === 6
      }
    }
  },

  canvas: {
    applyDrawingState (ctx) {
      ctx.transform(
        this.matrix[0],
        this.matrix[1],
        this.matrix[2],
        this.matrix[3],
        this.matrix[4],
        this.matrix[5]
      )
    }
  },

  render (h) {
    return h('span', this.$slots['default'])
  }
} as ComponentOptions<TransformMixin>