<script setup lang="ts" generic="T extends BaseCardData">
/**
 * VueCardStack - A high-performance, touch-enabled card stack component for Vue 3
 *
 * Features:
 * - Generic type support for custom card data
 * - Touch and mouse interaction support
 * - Smooth animations with configurable timing
 * - Responsive layout with auto-sizing
 * - Accessibility support with ARIA attributes
 * - Performance optimized with shallow refs and computed caching
 *
 * @author ReactivePixels
 * @version 1.0.0
 * @license MIT
 */
import { useCardStack } from '../composables/useCardStack'
import type { BaseCardData, CardStackConfig, CardStackEmits, CardStackProps } from '../types'
import { computed, onErrorCaptured, ref, toRef } from 'vue'

/**
 * Component props with comprehensive defaults and validation
 */
const props = withDefaults(defineProps<CardStackProps<T>>(), {
  cardWidth: 300,
  cardHeight: 400,
  stackWidth: null,
  sensitivity: 0.25,
  maxVisibleCards: 10,
  scaleMultiplier: 0.5,
  speed: 0.2,
  paddingHorizontal: 20,
  paddingVertical: 20
})

/**
 * Component emits for external event handling
 */
const emit = defineEmits<CardStackEmits>()

/**
 * Template ref for the main container element
 */
const elementRef = ref<HTMLElement | null>(null)

/**
 * Error state management
 */
const error = ref<Error | null>(null)

/**
 * Convert props to reactive config object for composable consumption
 * Using computed to ensure reactivity while maintaining performance
 */
const config = computed(
  (): CardStackConfig => ({
    cardWidth: props.cardWidth,
    cardHeight: props.cardHeight,
    stackWidth: props.stackWidth,
    sensitivity: props.sensitivity,
    maxVisibleCards: props.maxVisibleCards,
    scaleMultiplier: props.scaleMultiplier,
    speed: props.speed,
    paddingHorizontal: props.paddingHorizontal,
    paddingVertical: props.paddingVertical
  })
)

/**
 * Validate props to ensure component functions correctly
 */
const validateProps = () => {
  if (!Array.isArray(props.cards)) {
    throw new Error('Cards prop must be an array')
  }

  if (props.cardWidth <= 0 || props.cardHeight <= 0) {
    throw new Error('Card width and height must be positive numbers')
  }

  if (props.sensitivity < 0 || props.sensitivity > 1) {
    throw new Error('Sensitivity must be between 0 and 1')
  }

  if (props.maxVisibleCards < 1) {
    throw new Error('Max visible cards must be at least 1')
  }
}

/**
 * Error handling for component lifecycle
 */
onErrorCaptured((err: Error) => {
  error.value = err
  console.error('VueCardStack error:', err)
  return true // Prevent error from propagating
})

// Validate props on setup
try {
  validateProps()
} catch (err) {
  error.value = err as Error
}

/**
 * Initialize card stack composable with reactive dependencies
 */
const { stack, containerWidth, originalActiveCardIndex, isDragging, onNext, onPrevious } =
  useCardStack<T>(
    toRef(() => props.cards),
    toRef(() => config.value),
    elementRef,
    emit
  )

/**
 * Computed properties for accessibility and UI state
 */
const containerAriaLabel = computed(
  () =>
    `Card stack with ${props.cards.length} cards, currently showing card ${originalActiveCardIndex.value + 1}`
)

const containerAriaLive = computed(() => (isDragging.value ? 'polite' : 'off'))

/**
 * Handle keyboard navigation for accessibility
 */
const handleKeydown = (event: KeyboardEvent) => {
  if (error.value) return

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      onPrevious()
      break
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      onNext()
      break
    case 'Home':
      event.preventDefault()
      // Move to first card (implement if needed)
      break
    case 'End':
      event.preventDefault()
      // Move to last card (implement if needed)
      break
  }
}
</script>

<template>
  <!-- Error state display -->
  <div v-if="error" class="vue-card-stack-error" role="alert" aria-live="assertive">
    <p>Error in Card Stack: {{ error.message }}</p>
  </div>

  <!-- Main card stack container -->
  <div
    v-else
    ref="elementRef"
    class="vue-card-stack"
    role="group"
    :aria-label="containerAriaLabel"
    :aria-live="containerAriaLive"
    tabindex="0"
    :style="{
      position: 'relative',
      outline: 'none'
    }"
    @keydown="handleKeydown"
  >
    <!-- Card container with overflow handling -->
    <div
      class="vue-card-stack__container"
      :style="{
        position: 'relative',
        overflow: 'hidden',
        height: `${props.cardHeight + props.paddingVertical * 2}px`,
        width: containerWidth,
        borderRadius: '8px' // Modern rounded corners
      }"
    >
      <!-- Individual cards with enhanced accessibility -->
      <div
        v-for="(card, index) in stack"
        :key="`card-${card._id}`"
        class="vue-card-stack__card"
        role="group"
        :aria-label="`Card ${index + 1} of ${stack.length}`"
        :aria-hidden="card.opacity === 0"
        :tabindex="card.opacity > 0 ? 0 : -1"
        :style="{
          position: 'absolute',
          transformOrigin: '0 50%',
          cursor: isDragging ? 'grabbing' : 'grab',
          left: 0,
          top: 0,
          opacity: card.opacity,
          display: card.display,
          width: `${card.width}px`,
          height: `${card.height}px`,
          zIndex: card.zIndex,
          transition: isDragging
            ? 'opacity 0.2s ease'
            : `transform ${props.speed}s ease-out, opacity ${props.speed}s ease-out`,
          transform: `
            scale(${card.scale})
            translate(${card.xPos}px, ${card.yPos}px)
          `,
          willChange: isDragging ? 'transform' : 'auto', // Optimize rendering
          backfaceVisibility: 'hidden', // Improve performance
          perspective: '1000px' // Enable hardware acceleration
        }"
      >
        <!-- Card content slot with enhanced props -->
        <slot
          name="card"
          :card="{
            ...card,
            $index: index,
            data: (({ _id, _index, ...rest }) => rest)(card)
          }"
        />
      </div>
    </div>

    <!-- Navigation slot with accessibility enhancements -->
    <div class="vue-card-stack__nav" role="navigation" aria-label="Card navigation">
      <slot
        name="nav"
        :active-card-index="originalActiveCardIndex"
        :on-next="onNext"
        :on-previous="onPrevious"
        :total-cards="props.cards.length"
        :is-dragging="isDragging"
      />
    </div>
  </div>
</template>

<style scoped>
/**
 * Component styles with CSS custom properties for theming
 */
.vue-card-stack {
  /* CSS custom properties for easy theming */
  --vue-card-stack-focus-color: #007bff;
  --vue-card-stack-focus-width: 2px;
  --vue-card-stack-error-bg: #f8d7da;
  --vue-card-stack-error-color: #721c24;
  --vue-card-stack-error-border: #f5c6cb;
}

.vue-card-stack:focus-visible {
  outline: var(--vue-card-stack-focus-width) solid var(--vue-card-stack-focus-color);
  outline-offset: 2px;
  border-radius: 4px;
}

.vue-card-stack__container {
  /* Ensure proper stacking context */
  isolation: isolate;
}

.vue-card-stack__card {
  /* Improve text rendering on scaled cards */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.vue-card-stack__card:focus-visible {
  outline: var(--vue-card-stack-focus-width) solid var(--vue-card-stack-focus-color);
  outline-offset: 2px;
  border-radius: 4px;
  z-index: 9999; /* Ensure focus outline is visible */
}

.vue-card-stack-error {
  padding: 1rem;
  margin: 1rem 0;
  background-color: var(--vue-card-stack-error-bg);
  color: var(--vue-card-stack-error-color);
  border: 1px solid var(--vue-card-stack-error-border);
  border-radius: 4px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.vue-card-stack-error p {
  margin: 0;
  font-weight: 500;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .vue-card-stack__card {
    transition: opacity 0.1s ease !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .vue-card-stack:focus-visible {
    outline-color: currentColor;
  }

  .vue-card-stack__card:focus-visible {
    outline-color: currentColor;
  }
}
</style>
