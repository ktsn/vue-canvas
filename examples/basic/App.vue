<template lang="html">
  <div>
    <context-2d :width="300" :height="300">
      <rectangle :fill="true" :x="x" :y="y" :width="width" :height="height"></rectangle>
    </context-2d>
    <div class="">
      <div>
        x <input type="number" v-model="x">
        y <input type="number" v-model="y">
        width <input type="number" v-model="width">
        height <input type="number" v-model="height">
      </div>
    </div>
  </div>
</template>

<script>
import { Context2d, Rectangle } from '../../src'

export default {
  data () {
    return {
      x: 20,
      y: 10,
      width: 150,
      height: 120
    }
  },

  components: {
    Context2d,
    Rectangle
  }
}
</script>
