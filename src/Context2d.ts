import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import contextElementMixin from './mixins/context-element'

interface Context2d extends Vue {
  height: number
  width: number
}

export default {
  mixins: [contextElementMixin],

  props: {
    height: {
      type: Number,
      default: 150
    },
    width: {
      type: Number,
      default: 300
    }
  },

  canvas: {
    getContext () {
      const canvas: HTMLCanvasElement = this.$el as any
      return canvas.getContext('2d')!
    }
  },

  render (h) {
    const { height, width } = this

    return h('canvas', {
      attrs: { height, width }
    }, this.$slots['default'])
  }
} as ComponentOptions<Context2d>
