import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import shapeMixin from '../mixins/shape'

interface Rectangle extends Vue {
  fill?: boolean
  stroke?: boolean
  x: number
  y: number
  width: number
  height: number
}

export default {
  mixins: [shapeMixin],

  props: {
    fill: Boolean,
    stroke: Boolean,
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },

  canvas: {
    render (ctx) {
      ctx.beginPath()
      ctx.rect(this.x, this.y, this.width, this.height)
      if (this.fill) {
        ctx.fill()
      }
      if (this.stroke) {
        ctx.stroke()
      }
    }
  }
} as ComponentOptions<Rectangle>
