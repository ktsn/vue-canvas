import * as Vue from 'vue'

// set merge strategy of canvas option
const strategies = Vue.config.optionMergeStrategies
strategies.canvas = strategies.methods