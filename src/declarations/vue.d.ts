import * as Vue from 'vue'
import { CanvasOptions } from './index'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    canvas?: CanvasOptions<V>
  }
}
