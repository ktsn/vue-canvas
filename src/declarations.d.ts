import * as Vue from 'vue'

export type Dictionary<T> = { [key: string]: T }

export interface CanvasOptions<V extends Vue> {
  render? (this: V, ctx: CanvasRenderingContext2D): void
  getContext? (this: V): CanvasRenderingContext2D
}
