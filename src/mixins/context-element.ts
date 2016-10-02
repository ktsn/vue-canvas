import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

interface ContextElementMixin extends Vue {
  eventBus: Vue
  _ctx: CanvasRenderingContext2D
  render (): void
}

export default {
  beforeCreate () {
    this.eventBus = new Vue()
    this.eventBus.$on('update', () => {
      const { width, height } = this._ctx.canvas
      this._ctx.clearRect(0, 0, width, height)
      this.render()
    })
  },

  mounted () {
    this._ctx = this.$options.canvas!.getContext!.call(this)
    this.render()
  },

  methods: {
    render () {
      this.$children.forEach((child: Vue) => {
        const options = child.$options.canvas!

        this._ctx.beginPath()
        options.render!.call(child, this._ctx)
      })
    }
  }
} as ComponentOptions<ContextElementMixin>
