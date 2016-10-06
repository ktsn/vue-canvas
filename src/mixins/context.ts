import * as Vue from 'vue'
import { ComponentOptions } from 'vue'
import { Renderer } from '../renderer'
import { noop, throttledTick } from '../utils'

interface ContextMixin extends Vue {
  height: number
  width: number
  eventBus: Vue
  _renderer: Renderer
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

    this.$options.canvas!.render = noop
  },

  mounted () {
    const ctx = this.$options.canvas!.getContext!.call(this)
    this._renderer = new Renderer(ctx)
    this.render()
  },

  methods: {
    render (this: ContextMixin) {
      this._renderer.clear()
      this._renderer.render(this)
    }
  },

  render (h) {
    const { height, width } = this

    return h('canvas', {
      attrs: { height, width }
    }, this.$slots['default'])
  }
} as ComponentOptions<ContextMixin>
