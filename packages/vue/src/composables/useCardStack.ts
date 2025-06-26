import {
  type Ref,
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  readonly,
  ref,
  shallowRef,
  watchEffect
} from 'vue'

import {
  type BaseCardData,
  CARD_STACK_CONSTANTS,
  type CardStackConfig,
  type DragEvent,
  type InternalCard
} from '../types'
import { debounce } from '../utils/debounce'

import { useDragHandling } from './useDragHandling'
import { useStackCalculations } from './useStackCalculations'

/**
 * Main composable for card stack functionality with comprehensive state management.
 *
 * This composable orchestrates all card stack behavior including:
 * - Card positioning and animation
 * - Drag and touch interactions
 * - Responsive layout calculations
 * - Event handling and cleanup
 * - Performance optimization with shallow refs
 *
 * @template T - The card data type that extends BaseCardData
 * @param cards - Reactive array of card data
 * @param config - Reactive configuration object
 * @param elementRef - Reactive reference to the container DOM element
 * @param emit - Event emitter function for component communication
 * @returns Object containing reactive state and control methods
 *
 * @example
 * ```typescript
 * const cardStack = useCardStack(
 *   cardsRef,
 *   configRef,
 *   elementRef,
 *   (event, value) => emit(event, value)
 * )
 *
 * // Access reactive state
 * const { stack, isDragging, originalActiveCardIndex } = cardStack
 *
 * // Control navigation
 * cardStack.onNext()
 * cardStack.onPrevious()
 * ```
 */
export function useCardStack<T extends BaseCardData>(
  cards: Ref<T[]>,
  config: Ref<CardStackConfig>,
  elementRef: Ref<HTMLElement | null>,
  emit: (event: 'move', value: number) => void
) {
  // Performance-optimized reactive state using shallowRef for arrays/objects
  const stack = shallowRef<(T & InternalCard)[]>([])
  const width = ref(0)
  const activeCardIndex = ref(1)
  const isInitialized = ref(false)
  const error = ref<Error | null>(null)

  // Initialize sub-composables for modular functionality
  const calculations = useStackCalculations(cards, config, elementRef, width, ref(false))
  const dragHandling = useDragHandling(config, calculations.elementXPosOffset)

  /**
   * Validate configuration to ensure safe operation.
   * Throws descriptive errors for invalid configurations.
   */
  const validateConfig = (): void => {
    const cfg = config.value

    if (cfg.cardWidth <= 0 || cfg.cardHeight <= 0) {
      throw new Error('Card dimensions must be positive')
    }

    if (cfg.sensitivity < 0 || cfg.sensitivity > 1) {
      throw new Error('Sensitivity must be between 0 and 1')
    }

    if (cfg.maxVisibleCards < 1) {
      throw new Error('Must have at least 1 visible card')
    }

    if (cfg.speed < 0.1 || cfg.speed > 5) {
      throw new Error('Animation speed must be between 0.1 and 5 seconds')
    }
  }

  /**
   * Initialize the card stack with proper error handling and validation.
   * Reorders cards to position the last card at the front for the stack effect.
   */
  const init = async (): Promise<void> => {
    try {
      validateConfig()

      if (!cards.value || cards.value.length === 0) {
        stack.value = []
        isInitialized.value = true
        return
      }

      // Create a copy to avoid mutating the original array
      const cardsCopy = [...cards.value]

      // Move bottom card to top of stack (positioned offscreen) for the stack effect
      if (cardsCopy.length > 1) {
        const lastCard = cardsCopy.pop()
        if (lastCard) {
          cardsCopy.unshift(lastCard)
        }
      }

      // Wait for next tick to ensure DOM is ready
      await nextTick()

      // Generate stack with unique IDs and calculated defaults
      stack.value = cardsCopy.map((card, index) => {
        const defaults = calculations.cardDefaults.value[index] || {}
        return {
          _id: Date.now() + index + Math.random(), // Ensure unique IDs
          _index: index,
          ...card,
          ...defaults
        } as T & InternalCard
      })

      isInitialized.value = true
      error.value = null
    } catch (err) {
      error.value = err as Error
      console.error('Failed to initialize card stack:', err)
      throw err
    }
  }

  /**
   * Rebuild stack with updated calculations while preserving card order.
   * Used when configuration or container size changes.
   */
  const rebuild = async (): Promise<void> => {
    if (!isInitialized.value) return

    try {
      await nextTick()

      stack.value = stack.value.map((card, index) => {
        const defaults = calculations.cardDefaults.value[index] || {}
        return {
          ...card,
          ...defaults
        }
      })
    } catch (err) {
      error.value = err as Error
      console.error('Failed to rebuild card stack:', err)
    }
  }

  /**
   * Handle container resize logic with async operations.
   */
  const handleResizeAsync = async () => {
    try {
      if (elementRef.value) {
        const newWidth = elementRef.value.clientWidth
        if (newWidth !== width.value) {
          width.value = newWidth
          await rebuild()
        }
      }
    } catch (err) {
      error.value = err as Error
      console.error('Failed to handle resize:', err)
    }
  }

  /**
   * Handle container resize events with optimized debouncing.
   * Updates width and triggers rebuild for responsive behavior.
   */
  const handleResize = debounce(
    () => void handleResizeAsync(),
    CARD_STACK_CONSTANTS.RESIZE_DEBOUNCE_DELAY
  )

  /**
   * Move to the next card with smooth animation.
   * Moves the front card to the back of the stack.
   */
  const onNext = async (): Promise<void> => {
    if (!isInitialized.value || stack.value.length <= 1) return

    try {
      const cardToMoveToBottom = stack.value.shift()
      if (cardToMoveToBottom) {
        stack.value.push(cardToMoveToBottom)
      }
      await rebuild()
    } catch (err) {
      error.value = err as Error
      console.error('Failed to move to next card:', err)
    }
  }

  /**
   * Move to the previous card with smooth animation.
   * Moves the back card to the front of the stack.
   */
  const onPrevious = async (): Promise<void> => {
    if (!isInitialized.value || stack.value.length <= 1) return

    try {
      const cardToMoveToTop = stack.value.pop()
      if (cardToMoveToTop) {
        stack.value.unshift(cardToMoveToTop)
      }
      await rebuild()
    } catch (err) {
      error.value = err as Error
      console.error('Failed to move to previous card:', err)
    }
  }

  /**
   * Update stack positions during drag operation with performance optimization.
   * Calculates real-time positioning based on drag distance and direction.
   */
  const moveStack = (dragXPos: number): void => {
    try {
      if (!isInitialized.value) return

      const activeCardOffset = dragXPos - dragHandling.dragStartX.value

      // Emit move event with normalized progress value
      const normalizedOffset =
        activeCardOffset / (config.value.cardWidth + config.value.paddingHorizontal)
      emit('move', normalizedOffset)

      // Determine active card based on drag direction
      activeCardIndex.value = dragHandling.isDraggingRight.value ? 1 : 0

      // Update stack positions with optimized calculations
      stack.value = stack.value.map((card, index) => {
        const isActiveCard = index === activeCardIndex.value
        const defaults = calculations.cardDefaults.value[index] || {}

        // Calculate dynamic positioning based on drag offset
        const xPos = isActiveCard
          ? (defaults.xPos ?? 0) + activeCardOffset
          : (defaults.xPos ?? 0) +
            (calculations.xPosOffset.value /
              (config.value.cardWidth + config.value.paddingHorizontal)) *
              activeCardOffset

        // Calculate dynamic scaling for smooth transitions
        const scale = isActiveCard
          ? (defaults.scale ?? 1)
          : (defaults.scale ?? 1) +
            (calculations.scaleMultiplier.value /
              (config.value.cardWidth + config.value.paddingHorizontal)) *
              activeCardOffset

        // Handle opacity changes for revealing/hiding cards
        const opacity =
          index === 0 && !dragHandling.isDraggingRight.value ? 1 : (defaults.opacity ?? 1)

        return {
          ...card,
          ...defaults,
          xPos,
          scale: Math.max(0, Math.min(1, scale)), // Clamp scale to valid range
          opacity: Math.max(0, Math.min(1, opacity)) // Clamp opacity to valid range
        }
      })
    } catch (err) {
      error.value = err as Error
      console.error('Failed to update stack during drag:', err)
    }
  }

  /**
   * Finalize stack position after drag ends.
   * Determines whether to change cards based on drag distance and threshold.
   */
  const updateStack = async (): Promise<void> => {
    try {
      if (!isInitialized.value) return

      const activeCard = stack.value[activeCardIndex.value]
      const activeCardRestPoint = calculations.stackRestPoints.value[activeCardIndex.value]

      if (!activeCard || activeCardRestPoint === undefined) {
        await rebuild()
        return
      }

      const distanceTravelled = activeCard.xPos - activeCardRestPoint

      // Reset move event
      emit('move', 0)

      // Check if drag distance exceeds threshold for card change
      if (dragHandling.shouldChangeCard(distanceTravelled)) {
        if (dragHandling.isDraggingRight.value) {
          await onNext()
        } else {
          await onPrevious()
        }
      } else {
        // Snap back to original position
        await rebuild()
      }
    } catch (err) {
      error.value = err as Error
      console.error('Failed to update stack after drag:', err)
    }
  }

  /**
   * Handle touch/mouse start with proper event management.
   */
  const onTouchStart = (e: DragEvent): void => {
    try {
      dragHandling.startDrag(e)
      document.addEventListener(dragHandling.dragEvent.value, onDrag, { passive: false })
    } catch (err) {
      error.value = err as Error
      console.error('Failed to start drag operation:', err)
    }
  }

  /**
   * Handle touch/mouse end with cleanup.
   */
  const onTouchEnd = async (): Promise<void> => {
    try {
      dragHandling.endDrag()
      document.removeEventListener(dragHandling.dragEvent.value, onDrag)
      await updateStack()
    } catch (err) {
      error.value = err as Error
      console.error('Failed to end drag operation:', err)
    }
  }

  /**
   * Handle drag movement with throttling for performance.
   */
  const onDrag = (e: DragEvent): void => {
    try {
      const dragData = dragHandling.updateDrag(e)
      if (dragData) {
        moveStack(dragData.dragXPos)
      }
    } catch (err) {
      error.value = err as Error
      console.error('Failed to handle drag movement:', err)
    }
  }

  /**
   * Get the original active card index for external access.
   * This represents the actual card from the original array that's currently active.
   */
  const originalActiveCardIndex = computed(() => {
    try {
      if (!isInitialized.value || stack.value.length === 0) return 0

      const activeCard = stack.value[activeCardIndex.value]
      return activeCard?._index ?? 0
    } catch (err) {
      console.error('Failed to compute original active card index:', err)
      return 0
    }
  })

  /**
   * Get current stack statistics for debugging and monitoring.
   */
  const stackStats = computed(() => {
    if (process.env.NODE_ENV !== 'development') return null

    return {
      totalCards: stack.value.length,
      activeIndex: activeCardIndex.value,
      originalActiveIndex: originalActiveCardIndex.value,
      isInitialized: isInitialized.value,
      isDragging: dragHandling.isDragging.value,
      hasError: !!error.value
    }
  })

  /**
   * Watch for card array changes and reinitialize if needed.
   */
  watchEffect(() => {
    if (cards.value && isInitialized.value) {
      void init().catch(console.error)
    }
  })

  // Create wrapper functions for proper event listener cleanup
  const handleResizeWrapper = () => void handleResize()
  const handleTouchEndWrapper = () => void onTouchEnd()

  // Lifecycle management with proper cleanup
  onMounted(() => {
    void (async () => {
      try {
        await init()

        // Set up event listeners
        window.addEventListener('resize', handleResizeWrapper, { passive: true })

        if (elementRef.value) {
          elementRef.value.addEventListener(dragHandling.touchStartEvent.value, onTouchStart, {
            passive: false
          })
        }

        document.addEventListener(dragHandling.touchEndEvent.value, handleTouchEndWrapper, {
          passive: true
        })
      } catch (err) {
        console.error('Failed to mount card stack:', err)
      }
    })()
  })

  onBeforeUnmount(() => {
    try {
      // Clean up all event listeners
      window.removeEventListener('resize', handleResizeWrapper)

      if (elementRef.value) {
        elementRef.value.removeEventListener(dragHandling.touchStartEvent.value, onTouchStart)
      }

      document.removeEventListener(dragHandling.touchEndEvent.value, handleTouchEndWrapper)
      document.removeEventListener(dragHandling.dragEvent.value, onDrag)

      // Cancel any pending debounced operations
      if (handleResize.cancel) {
        handleResize.cancel()
      }
    } catch (err) {
      console.error('Failed to cleanup card stack:', err)
    }
  })

  return {
    // Core reactive state (readonly for external consumption)
    stack: readonly(stack),
    containerWidth: calculations.containerWidth,
    originalActiveCardIndex: readonly(originalActiveCardIndex),
    isDragging: dragHandling.isDragging,
    isInitialized: readonly(isInitialized),
    error: readonly(error),

    // Navigation methods
    onNext,
    onPrevious,

    // Advanced control methods
    init,
    rebuild,

    // Development utilities
    ...(process.env.NODE_ENV === 'development' && {
      stackStats: readonly(stackStats),
      calculations,
      dragHandling
    })
  }
}
