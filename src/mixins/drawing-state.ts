import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import notifyMixin from './notify'

const props = {
  strokeStyle: String,
  fillStyle: String,
  globalAlpha: Number,
  lineWidth: Number,
  lineCap: String,
  lineJoin: String,
  miterLimit: Number,
  shadowOffsetX: Number,
  shadowOffsetY: Number,
  shadowBlur: Number,
  shadowColor: String,
  globalCompositeOperations: String,
  font: String,
  textAlign: String,
  textBaseLine: String
}

const propKeys = Object.keys(props) 

export default {
  mixins: [notifyMixin],

  props,

  canvas: {
    applyDrawingState (ctx) {
      propKeys
        .map(key => ({
          key,
          value: (this as any)[key]
        }))
        .filter(p => p.value != null)
        .forEach(p => {
          (ctx as any)[p.key] = p.value
        })
    }
  }
} as ComponentOptions<Vue>