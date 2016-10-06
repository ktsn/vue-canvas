import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import contextMixin from './mixins/context'

export default {
  mixins: [contextMixin],

  canvas: {
    getContext () {
      const canvas: HTMLCanvasElement = this.$el as any
      return canvas.getContext('2d')!
    }
  }
} as ComponentOptions<Vue>
