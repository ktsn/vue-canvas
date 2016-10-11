import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import propertyMixin from '../mixins/property'
import { noop } from '../utils'

export default {
  mixins: [propertyMixin],

  render (h) {
    return h('span', this.$slots['default'])
  }
} as ComponentOptions<Vue>