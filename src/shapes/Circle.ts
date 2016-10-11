import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import shapeMixin from '../mixins/shape'

interface Circle extends Vue {
  fill: boolean
  stroke: boolean
  x: number
  y: number
  radius: number
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
    radius: {
      type: Number,
      required: true
    }
  },

  canvas: {
    render (ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)

      if (this.fill) {
        ctx.fill()
      }

      if (this.stroke) {
        ctx.stroke()
      }
    }
  }
} as ComponentOptions<Circle>