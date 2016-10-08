import * as Vue from 'vue'
import { Dictionary } from './declarations'

export const noop = () => {}

export function warn (message: string): void {
  console.error('[vue-canvas] ' + message)
}

export function assert (condition: boolean, message: string): void {
  if (!condition) {
    throw new Error('[vue-canvas] ' + message)
  }
}

export function contains <T>(list: T[], value: T): boolean {
  return list.indexOf(value) > -1
}

export function merge <T, U>(t: T, u: U): T & U {
  const res: any = {}
  const list: any[] = [t, u]
  list.forEach(obj => {
    Object.keys(obj).forEach(key => {
      res[key] = obj[key]
    })
  })
  return res
}

export function pick (obj: Dictionary<any>, keys: string[]): Dictionary<any> {
  const res: any = {}
  keys.forEach(key => {
    res[key] = obj[key]
  })
  return res
}

/**
 * Similar to Vue.nextTick but reduce duplicated functions
 */
export const throttledTick = (function () {
  // store revered tick function to reduce duplication
  const ticked: (() => void)[] = []

  function resetTicked (): void {
    ticked.length = 0
  }

  return function (fn: () => void): void {
    if (contains(ticked, fn)) return

    if (ticked.length === 0) {
      Vue.nextTick(resetTicked)
    }

    ticked.push(fn)
    Vue.nextTick(fn)
  }
}())
