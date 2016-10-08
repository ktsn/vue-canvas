import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import drawingStateMixin from '../mixins/drawing-state'
import { noop } from '../utils'

export default {
  mixins: [drawingStateMixin],

  canvas: {
    render: noop
  },

  render (h) {
    return h('span', this.$slots['default'])
  }
} as ComponentOptions<Vue>