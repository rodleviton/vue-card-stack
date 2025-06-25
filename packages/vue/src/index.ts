import VueCardStack from './components/VueCardStack.vue'
import type { App } from 'vue'

export * from './types'
export { createVueCardStack } from './components/VueCardStackDefineComponent'

// Export the component
export { VueCardStack }

export const VueCardStackPlugin = {
  install: (app: App) => {
    app.component('VueCardStack', VueCardStack)
  }
}

// For Vue.use() support
declare global {
  interface Window {
    Vue?: App
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('VueCardStack', VueCardStack)
}
