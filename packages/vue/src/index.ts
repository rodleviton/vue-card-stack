/**
 * Vue Card Stack - A high-performance, touch-enabled card stack component for Vue 3
 *
 * @description
 * This library provides a flexible and performant card stack component with support for:
 * - Touch and mouse interactions
 * - Generic TypeScript support for custom card data
 * - Responsive design with configurable sizing
 * - Smooth animations with hardware acceleration
 * - Accessibility features including keyboard navigation
 * - Event-driven architecture for custom integrations
 *
 * @example Basic Usage
 * ```vue
 * <template>
 *   <VueCardStack
 *     :cards="cards"
 *     :card-width="300"
 *     :card-height="400"
 *     @move="handleMove"
 *   >
 *     <template #card="{ card }">
 *       <div class="my-card">
 *         <h3>{{ card.data.title }}</h3>
 *         <p>{{ card.data.description }}</p>
 *       </div>
 *     </template>
 *   </VueCardStack>
 * </template>
 * ```
 *
 * @example Type-safe Usage
 * ```typescript
 * import { createVueCardStack } from 'vue-card-stack'
 *
 * interface MyCard extends BaseCardData {
 *   title: string
 *   description: string
 *   imageUrl: string
 * }
 *
 * const TypedCardStack = createVueCardStack<MyCard>()
 * ```
 *
 * @author ReactivePixels
 * @version 1.0.0
 * @license MIT
 */
import type { App } from 'vue'

import VueCardStack from './components/VueCardStack.vue'

// Export all types for external use
export * from './types'

// Export composables for advanced usage
export { useCardStack } from './composables/useCardStack'
export { useDragHandling } from './composables/useDragHandling'
export { useStackCalculations } from './composables/useStackCalculations'

// Export utilities
export { debounce, throttle } from './utils/debounce'

// Export component factory for type safety
export { createVueCardStack } from './components/VueCardStackDefineComponent'

// Export the main component
export { VueCardStack }

/**
 * Vue plugin for global component registration.
 *
 * @example
 * ```typescript
 * import { createApp } from 'vue'
 * import { VueCardStackPlugin } from 'vue-card-stack'
 *
 * const app = createApp(App)
 * app.use(VueCardStackPlugin)
 * ```
 */
export const VueCardStackPlugin = {
  /**
   * Install the plugin by registering the VueCardStack component globally.
   *
   * @param app - The Vue application instance
   * @param options - Optional configuration for the plugin
   */
  install: (app: App, options?: { componentName?: string }) => {
    const componentName = options?.componentName ?? 'VueCardStack'

    try {
      app.component(componentName, VueCardStack)
    } catch (error) {
      console.error(`Failed to register ${componentName} component:`, error)
      throw new Error(`VueCardStackPlugin installation failed: ${String(error)}`)
    }
  }
}

/**
 * For convenient access to the plugin install method.
 *
 * @example
 * ```typescript
 * import { install } from 'vue-card-stack'
 * app.use({ install })
 * ```
 */
export const { install } = VueCardStackPlugin

// Legacy browser support for Vue 2 compatibility (if needed)
if (typeof window !== 'undefined') {
  interface WindowWithVue extends Window {
    Vue?: {
      component: (name: string, component: unknown) => void
    }
  }

  const globalVue = (window as WindowWithVue).Vue

  if (globalVue && typeof globalVue.component === 'function') {
    try {
      globalVue.component('VueCardStack', VueCardStack)
    } catch (error) {
      console.warn('Failed to auto-register VueCardStack for Vue 2:', error)
    }
  }
}
