import * as Vue from 'vue'

interface CanvasOptions<V extends Vue> {
  render? (this: V, ctx: CanvasRenderingContext2D): void
  getContext? (this: V): CanvasRenderingContext2D
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    canvas?: CanvasOptions<V>
  }
}
