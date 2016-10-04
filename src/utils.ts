import { Dictionary } from './declarations'
export function assert (condition: boolean, message: string): void {
  if (!condition) {
    throw new Error('[vue-canvas] ' + message)
  }
}

export function shallowEqual (a: Dictionary<any>, b: Dictionary<any>): boolean {
  if (a === b) return true

  return Object.keys(merge(a, b)).reduce((res, key) => {
    return res && a[key] === b[key]
  }, true)
}
