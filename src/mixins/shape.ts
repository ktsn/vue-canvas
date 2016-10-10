import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import { Dictionary } from '../declarations'

import drawingStateMixin from './drawing-state'
import { assert } from '../utils'

export default {
  mixins: [drawingStateMixin],

  canvas: {
    render () {
      assert(false, 'must be implemented canvas render function')
    }
  },

  render (h) {
    // always return empty node
    return h()
  }
} as ComponentOptions<Vue>
