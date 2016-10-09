import * as Vue from 'vue'
import { warn } from './utils'

export class Renderer {
  constructor (private ctx: CanvasRenderingContext2D) {}

  clear (): void {
    const { width, height } = this.ctx.canvas
    this.ctx.clearRect(0, 0, width, height)
  }

  render (vm: Vue): void {
    const options = vm.$options.canvas!
    if (process.env.NODE_ENV !== 'production') {
      if (!options) {
        warn(
          'canvas options must be defined for descendants of context ' +
          `<${vm._componentTag}>`
        )
        return
      }
    }

    // set drawing state
    this.ctx.save()
    if (typeof options.applyDrawingState === 'function') {
      options.applyDrawingState.call(vm, this.ctx)
    }

    // render target shape
    if (typeof options.render === 'function') {
      options.render.call(vm, this.ctx)
    }

    // render child shapes
    vm.$children.forEach(child => this.render(child))

    // restore drawing state
    this.ctx.restore()
  }
}