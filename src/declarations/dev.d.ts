// this file should not expose the user land
// only use for development

import 'vue'

declare global {
  const process: {
    env: {
      NODE_ENV?: string
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly _contentTag: string
  }
}
