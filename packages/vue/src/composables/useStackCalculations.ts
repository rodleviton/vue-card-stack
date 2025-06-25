import { computed, type Ref } from "vue";
import type { CardStackConfig, BaseCardData } from "../types";

/**
 * Provides reactive calculations for card stack layout, sizing, and positioning in a Vue component.
 *
 * Computes stack width, maximum visible cards, scale multipliers, container width, horizontal offsets, rest positions, default card properties, and element X offset for drag interactions, all based on the provided cards, configuration, element reference, container width, and dragging state.
 *
 * @returns An object containing computed properties for stack width, maximum visible cards, scale multiplier, container width, X position offset, stack rest points, default card properties, and element X position offset.
 */
export function useStackCalculations<T extends BaseCardData>(
  cards: Ref<T[]>,
  config: Ref<CardStackConfig>,
  elementRef: Ref<HTMLElement | null>,
  width: Ref<number>,
  isDragging: Ref<boolean>
) {
  /**
   * Calculate the effective stack width
   */
  const stackWidth = computed(() => {
    if (!config.value.stackWidth) {
      return config.value.cardWidth + config.value.paddingHorizontal * 2;
    } else if (typeof config.value.stackWidth === "number") {
      return config.value.stackWidth;
    }
    return width.value || elementRef.value?.clientWidth || 0;
  });

  /**
   * Calculate maximum visible cards based on available cards
   */
  const maxVisibleCards = computed(() => {
    return cards.value.length > config.value.maxVisibleCards
      ? config.value.maxVisibleCards
      : cards.value.length - 1;
  });

  /**
   * Calculate scale multiplier for card sizing effect
   */
  const scaleMultiplier = computed(() => {
    return ((config.value.scaleMultiplier - 1) * -1) / 10;
  });

  /**
   * Calculate container width for CSS
   */
  const containerWidth = computed(() => {
    if (!config.value.stackWidth) {
      return `${config.value.cardWidth + config.value.paddingHorizontal * 2}px`;
    } else if (typeof config.value.stackWidth === "number") {
      return `${config.value.stackWidth}px`;
    }
    return config.value.stackWidth as string;
  });

  /**
   * Calculate X position offset for card distribution
   */
  const xPosOffset = computed(() => {
    return (
      (stackWidth.value -
        config.value.paddingHorizontal * 2 -
        config.value.cardWidth) /
      (maxVisibleCards.value - 2)
    );
  });

  /**
   * Calculate rest positions for each card in the stack
   */
  const stackRestPoints = computed(() => {
    return cards.value.map((_, index) => {
      const offset = xPosOffset.value * (index - 1);

      if (!index) {
        return stackWidth.value + config.value.paddingHorizontal;
      } else if (index === 1) {
        return (
          stackWidth.value -
          config.value.cardWidth -
          config.value.paddingHorizontal
        );
      } else {
        return (
          stackWidth.value -
          config.value.cardWidth -
          offset -
          config.value.paddingHorizontal
        );
      }
    });
  });

  /**
   * Calculate default properties for each card
   */
  const cardDefaults = computed(() => {
    return cards.value.map((_, index) => {
      const scale = index >= 1 ? 1 - scaleMultiplier.value * (index - 1) : 1;
      const xPos = stackRestPoints.value[index];

      return {
        opacity: index > 0 && index < maxVisibleCards.value ? 1 : 0,
        display: index < maxVisibleCards.value + 1 ? "block" : "none",
        xPos: index < maxVisibleCards.value ? xPos : xPos + xPosOffset.value,
        yPos: config.value.paddingVertical,
        scale: scale > 0 ? scale : 0,
        width: config.value.cardWidth,
        height: config.value.cardHeight,
        zIndex: cards.value.length - index,
        isDragging: isDragging.value,
      };
    });
  });

  /**
   * Get element's X position offset for drag calculations
   */
  const elementXPosOffset = computed(() => {
    return elementRef.value?.getBoundingClientRect().x || 0;
  });

  return {
    stackWidth,
    maxVisibleCards,
    scaleMultiplier,
    containerWidth,
    xPosOffset,
    stackRestPoints,
    cardDefaults,
    elementXPosOffset,
  };
}
