<template>
  <div>
    <context-2d :width="300" :height="300">
      <r fill :fill-style="a.color" :x="a.x" :y="a.y" :width="a.width" :height="a.height"></r>
      <property :stroke-style="b.color">
        <r stroke :x="b.x" :y="b.y" :width="b.width" :height="b.height"></r>
      </property>
    </context-2d>
    <div class="">
      <div>
        x <input type="number" v-model="a.x">
        y <input type="number" v-model="a.y">
        width <input type="number" v-model="a.width">
        height <input type="number" v-model="a.height">
        color <input type="color" v-model="a.color">
      </div>
      <div>
        x <input type="number" v-model="b.x">
        y <input type="number" v-model="b.y">
        width <input type="number" v-model="b.width">
        height <input type="number" v-model="b.height">
        color <input type="color" v-model="b.color">
      </div>
    </div>
  </div>
</template>

<script>
import { Context2d, Property, Rect } from '../../src'

export default {
  data () {
    return {
      a: {
        x: 20,
        y: 10,
        width: 150,
        height: 120,
        color: '#00ffff'
      },
      b: {
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        color: '#0000ff'
      }
    }
  },

  components: {
    Context2d,
    Property,
    r: Rect
  }
}
</script>
