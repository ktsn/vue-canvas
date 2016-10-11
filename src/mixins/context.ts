import * as Vue from 'vue'
import { ComponentOptions } from 'vue'

import propertyMixin from './property'
import { Renderer } from '../renderer'
import { noop, throttledTick } from '../utils'

interface ContextMixin extends Vue {
  height: number
  width: number
  _eventBus: Vue
  _renderer: Renderer
  render (): void
}

export default {
  mixins: [propertyMixin],

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
    this._eventBus = new Vue()
    this._eventBus.$on('update', () => {
      throttledTick(this.render)
    })
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
