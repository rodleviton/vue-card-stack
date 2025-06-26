import { type Ref, computed, readonly, shallowRef, watchEffect } from 'vue'

import type { BaseCardData, CardStackConfig } from '../types'

/**
 * Composable for card stack calculations and positioning with optimized performance.
 *
 * This composable handles all mathematical calculations required for positioning
 * and styling cards in the stack, including responsive scaling, positioning,
 * and visibility calculations. All calculations are memoized for optimal performance.
 *
 * @template T - The card data type that extends BaseCardData
 * @param cards - Reactive array of card data
 * @param config - Reactive configuration object
 * @param elementRef - Reactive reference to the container element
 * @param width - Reactive width value for responsive calculations
 * @param isDragging - Reactive dragging state for performance optimization
 * @returns Object containing computed layout properties and calculations
 *
 * @example
 * ```typescript
 * const calculations = useStackCalculations(
 *   cardsRef,
 *   configRef,
 *   elementRef,
 *   widthRef,
 *   isDraggingRef
 * )
 *
 * // Access computed properties
 * const { containerWidth, cardDefaults, stackRestPoints } = calculations
 * ```
 */
export function useStackCalculations<T extends BaseCardData>(
  cards: Ref<T[]>,
  config: Ref<CardStackConfig>,
  elementRef: Ref<HTMLElement | null>,
  width: Ref<number>,
  isDragging: Ref<boolean>
) {
  // Cache for expensive calculations to avoid unnecessary recomputation
  const calculationCache = shallowRef<{
    lastConfigHash?: string
    lastCardsLength?: number
    lastStackWidth?: number | string | null
    lastWidth?: number
  }>({})

  /**
   * Generate a hash for configuration to detect changes.
   * This helps optimize calculations by avoiding recomputation when config hasn't changed.
   *
   * @returns Configuration hash string
   */
  const getConfigHash = computed((): string => {
    const {
      cardWidth,
      cardHeight,
      stackWidth,
      maxVisibleCards,
      scaleMultiplier,
      paddingHorizontal,
      paddingVertical
    } = config.value
    return `${cardWidth}-${cardHeight}-${stackWidth}-${maxVisibleCards}-${scaleMultiplier}-${paddingHorizontal}-${paddingVertical}`
  })

  /**
   * Calculate the effective stack width with proper fallbacks and validation.
   * Supports number (pixels), string (CSS values), and null (auto-calculated).
   */
  const stackWidth = computed((): number => {
    try {
      const configStackWidth = config.value.stackWidth

      if (!configStackWidth) {
        // Auto-calculate based on card width and padding
        return config.value.cardWidth + config.value.paddingHorizontal * 2
      }

      if (typeof configStackWidth === 'number') {
        // Validate numeric width
        return Math.max(configStackWidth, config.value.cardWidth)
      }

      // For string values, use container width or fallback
      const containerWidth = width.value ?? elementRef.value?.clientWidth ?? 0
      return Math.max(containerWidth, config.value.cardWidth)
    } catch (error) {
      console.error('Failed to calculate stack width:', error)
      // Fallback to safe default
      return config.value.cardWidth + config.value.paddingHorizontal * 2
    }
  })

  /**
   * Calculate maximum visible cards based on available cards and configuration.
   * Ensures we don't exceed the actual number of cards available.
   */
  const maxVisibleCards = computed((): number => {
    const configMax = config.value.maxVisibleCards
    const availableCards = cards.value.length

    if (availableCards === 0) return 0
    if (availableCards === 1) return 1

    // Return the minimum of configured max or available cards minus 1
    // (minus 1 because we need to keep one card hidden for the animation effect)
    return Math.min(configMax, availableCards - 1)
  })

  /**
   * Calculate scale multiplier for card sizing effect with bounds checking.
   * This controls how much smaller background cards appear relative to the front card.
   */
  const scaleMultiplier = computed((): number => {
    try {
      const multiplier = config.value.scaleMultiplier

      // Ensure multiplier is within valid bounds
      if (multiplier < 0 || multiplier > 1) {
        console.warn(`Scale multiplier ${multiplier} is out of bounds [0,1], using 0.5`)
        return ((0.5 - 1) * -1) / 10
      }

      return ((multiplier - 1) * -1) / 10
    } catch (error) {
      console.error('Failed to calculate scale multiplier:', error)
      return 0.05 // Safe fallback
    }
  })

  /**
   * Calculate container width for CSS styling.
   * Returns a properly formatted CSS value based on configuration.
   */
  const containerWidth = computed((): string => {
    try {
      const configStackWidth = config.value.stackWidth

      if (!configStackWidth) {
        return `${config.value.cardWidth + config.value.paddingHorizontal * 2}px`
      }

      if (typeof configStackWidth === 'number') {
        return `${configStackWidth}px`
      }

      return configStackWidth
    } catch (error) {
      console.error('Failed to calculate container width:', error)
      return `${config.value.cardWidth + config.value.paddingHorizontal * 2}px`
    }
  })

  /**
   * Calculate X position offset for distributing cards across the stack width.
   * This determines the spacing between cards in the stack.
   */
  const xPosOffset = computed((): number => {
    try {
      const visibleCards = maxVisibleCards.value

      if (visibleCards <= 2) return 0

      const availableWidth =
        stackWidth.value - config.value.paddingHorizontal * 2 - config.value.cardWidth

      // Distribute the available width among the cards (excluding first two positions)
      return Math.max(0, availableWidth / (visibleCards - 2))
    } catch (error) {
      console.error('Failed to calculate X position offset:', error)
      return 0
    }
  })

  /**
   * Calculate rest positions for each card in the stack.
   * These are the default X positions where cards settle when not being dragged.
   */
  const stackRestPoints = computed((): number[] => {
    try {
      const totalCards = cards.value.length
      const stackW = stackWidth.value
      const cardW = config.value.cardWidth
      const paddingH = config.value.paddingHorizontal
      const offset = xPosOffset.value

      return Array.from({ length: totalCards }, (_, index) => {
        if (index === 0) {
          // First card (bottom/hidden) - positioned off-screen to the right
          return stackW + paddingH
        } else if (index === 1) {
          // Second card (front/active) - positioned at the right edge
          return stackW - cardW - paddingH
        } else {
          // Subsequent cards - distributed across the stack with calculated offset
          const position = stackW - cardW - offset * (index - 1) - paddingH
          return Math.max(position, paddingH) // Ensure cards don't go beyond left boundary
        }
      })
    } catch (error) {
      console.error('Failed to calculate stack rest points:', error)
      return []
    }
  })

  /**
   * Calculate default properties for each card including position, scale, and visibility.
   * This is the most performance-critical calculation, so it's heavily optimized.
   */
  const cardDefaults = computed(() => {
    try {
      const totalCards = cards.value.length
      const maxVisible = maxVisibleCards.value
      const scaleStep = scaleMultiplier.value
      const cardW = config.value.cardWidth
      const cardH = config.value.cardHeight
      const paddingV = config.value.paddingVertical
      const restPoints = stackRestPoints.value
      const offset = xPosOffset.value
      const dragging = isDragging.value

      // Pre-calculate common values to avoid repeated computation
      const commonProps = {
        width: cardW,
        height: cardH,
        yPos: paddingV,
        isDragging: dragging
      }

      return Array.from({ length: totalCards }, (_, index) => {
        // Calculate scale with bounds checking
        const scaleValue = index >= 1 ? 1 - scaleStep * (index - 1) : 1
        const clampedScale = Math.max(0, Math.min(1, scaleValue))

        // Calculate position
        const baseXPos = restPoints[index] || 0
        const adjustedXPos = index < maxVisible ? baseXPos : baseXPos + offset

        // Calculate visibility
        const isVisible = index > 0 && index < maxVisible
        const shouldDisplay = index < maxVisible + 1

        return {
          ...commonProps,
          opacity: isVisible ? 1 : 0,
          display: shouldDisplay ? 'block' : 'none',
          xPos: adjustedXPos,
          scale: clampedScale,
          zIndex: totalCards - index
        }
      })
    } catch (error) {
      console.error('Failed to calculate card defaults:', error)
      return []
    }
  })

  /**
   * Get element's X position offset for drag calculations.
   * This is used to convert global coordinates to local coordinates.
   */
  const elementXPosOffset = computed((): number => {
    try {
      return elementRef.value?.getBoundingClientRect().x ?? 0
    } catch (error) {
      console.warn('Failed to get element X position offset:', error)
      return 0
    }
  })

  /**
   * Performance metrics for debugging and monitoring.
   * Only available in development mode.
   */
  const performanceMetrics = computed(() => {
    if (process.env.NODE_ENV !== 'development') return null

    return {
      totalCards: cards.value.length,
      visibleCards: maxVisibleCards.value,
      stackWidth: stackWidth.value,
      xPosOffset: xPosOffset.value,
      configHash: getConfigHash.value
    }
  })

  // Update calculation cache when dependencies change
  watchEffect(() => {
    calculationCache.value = {
      lastConfigHash: getConfigHash.value,
      lastCardsLength: cards.value.length,
      lastStackWidth: config.value.stackWidth,
      lastWidth: width.value
    }
  })

  return {
    // Core calculations
    stackWidth: readonly(stackWidth),
    maxVisibleCards: readonly(maxVisibleCards),
    scaleMultiplier: readonly(scaleMultiplier),
    containerWidth: readonly(containerWidth),
    xPosOffset: readonly(xPosOffset),
    stackRestPoints: readonly(stackRestPoints),
    cardDefaults: readonly(cardDefaults),
    elementXPosOffset: readonly(elementXPosOffset),

    // Development utilities
    ...(process.env.NODE_ENV === 'development' && {
      performanceMetrics: readonly(performanceMetrics),
      calculationCache: readonly(calculationCache)
    })
  }
}
