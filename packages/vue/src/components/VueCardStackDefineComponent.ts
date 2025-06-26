import type { VNode } from 'vue'

import type { BaseCardData } from '../types'

import VueCardStack from './VueCardStack.vue'

/**
 * Type-safe VueCardStack component factory with generic support.
 *
 * This factory function provides better type inference for custom card properties
 * by creating a properly typed component instance that preserves your custom card data structure.
 *
 * @template T - The card data type that extends BaseCardData
 * @returns A type-safe VueCardStack component with proper slot typing
 *
 * @example
 * ```typescript
 * interface MyCard extends BaseCardData {
 *   title: string
 *   description: string
 *   imageUrl: string
 * }
 *
 * const TypedCardStack = createVueCardStack<MyCard>()
 *
 * // Now TypedCardStack has full type safety for MyCard properties
 * ```
 */
export function createVueCardStack<T extends BaseCardData = BaseCardData>() {
  return VueCardStack as typeof VueCardStack & {
    new (): {
      /**
       * Component props with type-safe card data
       */
      $props: {
        /** Array of card data objects */
        cards: T[]
        /** Width of individual cards in pixels @default 300 */
        cardWidth?: number
        /** Height of individual cards in pixels @default 400 */
        cardHeight?: number
        /** Width of the stack container. Can be number (px), string (CSS value), or null for auto @default null */
        stackWidth?: number | string | null
        /** Sensitivity for drag gestures (0-1, higher = more sensitive) @default 0.25 */
        sensitivity?: number
        /** Maximum number of visible cards in the stack @default 10 */
        maxVisibleCards?: number
        /** Scale multiplier for card sizing effect @default 0.5 */
        scaleMultiplier?: number
        /** Animation speed in seconds @default 0.2 */
        speed?: number
        /** Horizontal padding around the stack in pixels @default 20 */
        paddingHorizontal?: number
        /** Vertical padding around the stack in pixels @default 20 */
        paddingVertical?: number
      }
      /**
       * Component slots with proper typing
       */
      $slots: {
        /**
         * Slot for rendering individual cards
         * @param props.card - Enhanced card object with positioning data and separated custom data
         * @param props.card._id - Unique identifier for the card
         * @param props.card._index - Original index in the cards array
         * @param props.card.xPos - X position in pixels
         * @param props.card.yPos - Y position in pixels
         * @param props.card.scale - Scale factor (0-1)
         * @param props.card.opacity - Opacity (0-1)
         * @param props.card.display - CSS display value
         * @param props.card.zIndex - z-index for layering
         * @param props.card.width - Width in pixels
         * @param props.card.height - Height in pixels
         * @param props.card.isDragging - Whether the card is currently being dragged
         * @param props.card.$index - Current index in the stack
         * @param props.card.data - Your custom card properties (excluding BaseCardData properties)
         */
        card: (props: {
          card: {
            _id: number
            _index: number
            xPos: number
            yPos: number
            scale: number
            opacity: number
            display: string
            zIndex: number
            width: number
            height: number
            isDragging: boolean
            $index: number
            data: Omit<T, keyof BaseCardData>
          }
        }) => VNode | null
        /**
         * Slot for custom navigation controls
         * @param props.activeCardIndex - Current active card index
         * @param props.onNext - Function to move to the next card
         * @param props.onPrevious - Function to move to the previous card
         */
        nav: (props: {
          activeCardIndex: number
          onNext: () => void
          onPrevious: () => void
        }) => VNode | null
      }
    }
  }
}

// Export the raw component for direct use without type safety
export { VueCardStack }
