import * as Vue from 'vue'
import { Dictionary, CanvasOptions } from './index'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    propsUpdated?: (this: V, newProps: Dictionary<any>, oldProps: Dictionary<any>) => void;
    canvas?: CanvasOptions<V>
  }
}
