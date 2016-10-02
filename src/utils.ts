export function assert (condition: boolean, message: string): void {
  if (!condition) {
    throw new Error('[vue-canvas] ' + message)
  }
}

export function shallowEqual (
  a: { [key: string]: any },
  b: { [key: string]: any }
): boolean {
  return Object.keys(a).reduce((res, key) => {
    return res && a[key] === b[key]
  }, true)
}
