import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import contextElementMixin from './mixins/context-element'

interface Context2d extends Vue {
  height: number
  width: number
}

export default {
  mixins: [contextElementMixin],

  canvas: {
    getContext () {
      const canvas: HTMLCanvasElement = this.$el as any
      return canvas.getContext('2d')!
    }
  }
} as ComponentOptions<Context2d>
