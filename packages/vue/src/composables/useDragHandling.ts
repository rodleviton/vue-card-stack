import { type Ref, computed, readonly, ref } from 'vue'

import type { CardStackConfig, DragData, DragEvent } from '../types'

/**
 * Composable for handling drag and touch interactions with enhanced cross-platform support.
 *
 * This composable provides unified handling for both mouse and touch events,
 * with proper gesture recognition and threshold-based card change detection.
 *
 * @param config - Reactive configuration object
 * @param elementXPosOffset - Reactive X position offset of the container element
 * @returns Object containing drag state and control methods
 *
 * @example
 * ```typescript
 * const dragHandling = useDragHandling(configRef, offsetRef)
 *
 * // Start drag operation
 * dragHandling.startDrag(event)
 *
 * // Update during drag
 * const dragData = dragHandling.updateDrag(event)
 *
 * // End drag operation
 * dragHandling.endDrag()
 * ```
 */
export function useDragHandling(config: Ref<CardStackConfig>, elementXPosOffset: Ref<number>) {
  // Reactive state - using ref for primitive values that need reactivity
  const isDragging = ref(false)
  const dragStartX = ref(0)
  const dragStartY = ref(0)
  const isDraggingRight = ref(false)

  // Performance optimization: Cache device detection
  const isTouch = computed(() => {
    if (typeof window === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  })

  // Event type mappings based on device capabilities
  const dragEvent = computed(() => (isTouch.value ? 'touchmove' : 'mousemove'))
  const touchStartEvent = computed(() => (isTouch.value ? 'touchstart' : 'mousedown'))
  const touchEndEvent = computed(() => (isTouch.value ? 'touchend' : 'mouseup'))

  /**
   * Safely extract X coordinate from touch or mouse event.
   * Handles edge cases where touch events might not have the expected structure.
   *
   * @param e - Touch or mouse event
   * @returns X coordinate or 0 if extraction fails
   */
  const getDragXPos = (e: DragEvent): number => {
    try {
      if (isTouch.value) {
        const touchEvent = e as TouchEvent
        const touch = touchEvent.touches?.[0] || touchEvent.changedTouches?.[0]
        return touch?.clientX ?? 0
      }
      return (e as MouseEvent).clientX
    } catch (error) {
      console.warn('Failed to extract X position from drag event:', error)
      return 0
    }
  }

  /**
   * Safely extract Y coordinate from touch or mouse event.
   * Handles edge cases where touch events might not have the expected structure.
   *
   * @param e - Touch or mouse event
   * @returns Y coordinate or 0 if extraction fails
   */
  const getDragYPos = (e: DragEvent): number => {
    try {
      if (isTouch.value) {
        const touchEvent = e as TouchEvent
        const touch = touchEvent.touches?.[0] || touchEvent.changedTouches?.[0]
        return touch?.clientY ?? 0
      }
      return (e as MouseEvent).clientY
    } catch (error) {
      console.warn('Failed to extract Y position from drag event:', error)
      return 0
    }
  }

  /**
   * Initialize drag operation with proper coordinate extraction and validation.
   *
   * @param e - Touch or mouse event that initiated the drag
   */
  const startDrag = (e: DragEvent): void => {
    try {
      // Prevent default behavior that might interfere with dragging
      e.preventDefault()

      isDragging.value = true
      dragStartX.value = getDragXPos(e) - elementXPosOffset.value
      dragStartY.value = getDragYPos(e)

      // Reset direction state
      isDraggingRight.value = false
    } catch (error) {
      console.error('Failed to start drag operation:', error)
      resetDragState()
    }
  }

  /**
   * Update drag position and direction during drag operation.
   * Returns null if drag is not active or update fails.
   *
   * @param e - Touch or mouse event during drag
   * @returns Drag data object or null if operation fails
   */
  const updateDrag = (e: DragEvent): DragData | null => {
    if (!isDragging.value) return null

    try {
      const dragXPos = getDragXPos(e) - elementXPosOffset.value
      const activeCardOffset = dragXPos - dragStartX.value

      // Update direction based on drag movement
      isDraggingRight.value = dragXPos > dragStartX.value

      return {
        dragXPos,
        activeCardOffset
      }
    } catch (error) {
      console.error('Failed to update drag position:', error)
      return null
    }
  }

  /**
   * Clean up and end drag operation.
   * Resets all drag-related state to initial values.
   */
  const endDrag = (): void => {
    isDragging.value = false
    // Keep start positions for potential momentum calculations
    // dragStartX.value = 0
    // dragStartY.value = 0
  }

  /**
   * Determine if drag distance meets the threshold for triggering a card change.
   * Uses sensitivity configuration to calculate the minimum required distance.
   *
   * @param distanceTravelled - Distance in pixels that the card was dragged
   * @returns True if the distance exceeds the threshold
   */
  const shouldChangeCard = (distanceTravelled: number): boolean => {
    try {
      const minDistanceToTravel =
        (config.value.cardWidth + config.value.paddingHorizontal) / (1 / config.value.sensitivity)

      return Math.abs(distanceTravelled) > minDistanceToTravel
    } catch (error) {
      console.error('Failed to calculate card change threshold:', error)
      return false
    }
  }

  /**
   * Reset all drag state to initial values.
   * Useful for error recovery and cleanup.
   */
  const resetDragState = (): void => {
    isDragging.value = false
    dragStartX.value = 0
    dragStartY.value = 0
    isDraggingRight.value = false
  }

  /**
   * Get the minimum distance required to trigger a card change.
   * This is useful for providing visual feedback to users.
   *
   * @returns Minimum distance in pixels
   */
  const getThresholdDistance = computed((): number => {
    try {
      return (
        (config.value.cardWidth + config.value.paddingHorizontal) / (1 / config.value.sensitivity)
      )
    } catch (error) {
      console.error('Failed to calculate threshold distance:', error)
      return 100 // Fallback value
    }
  })

  /**
   * Calculate drag progress as a percentage (0-100).
   * Useful for progress indicators and visual feedback.
   *
   * @param distanceTravelled - Current drag distance
   * @returns Progress percentage
   */
  const getDragProgress = (distanceTravelled: number): number => {
    const threshold = getThresholdDistance.value
    return Math.min((Math.abs(distanceTravelled) / threshold) * 100, 100)
  }

  return {
    // Readonly state for external consumption
    isDragging: readonly(isDragging),
    dragStartX: readonly(dragStartX),
    dragStartY: readonly(dragStartY),
    isDraggingRight: readonly(isDraggingRight),

    // Computed properties
    isTouch: readonly(isTouch),
    dragEvent: readonly(dragEvent),
    touchStartEvent: readonly(touchStartEvent),
    touchEndEvent: readonly(touchEndEvent),
    thresholdDistance: getThresholdDistance,

    // Core methods
    getDragXPos,
    getDragYPos,
    startDrag,
    updateDrag,
    endDrag,
    shouldChangeCard,
    resetDragState,

    // Utility methods
    getDragProgress
  }
}
