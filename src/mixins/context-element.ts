import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import { throttledTick } from '../utils'

interface ContextElementMixin extends Vue {
  height: number
  width: number 
  eventBus: Vue
  _ctx: CanvasRenderingContext2D
  render (): void
}

export default {
  props: {
    height: {
      type: Number,
      default: 150
    },
    width: {
      type: Number,
      default: 300
    }
  },

  beforeCreate () {
    this.eventBus = new Vue()
    this.eventBus.$on('update', () => {
      throttledTick(this.render)
    })
  },

  mounted () {
    this._ctx = this.$options.canvas!.getContext!.call(this)
    this.render()
  },

  methods: {
    render () {
      const { width, height } = this._ctx.canvas
      this._ctx.clearRect(0, 0, width, height)

      this.$children.forEach((child: Vue) => {
        const options = child.$options.canvas!
        options.render!.call(child, this._ctx)
      })
    }
  },

  render (h) {
    const { height, width } = this

    return h('canvas', {
      attrs: { height, width }
    }, this.$slots['default'])
  }
} as ComponentOptions<ContextElementMixin>
