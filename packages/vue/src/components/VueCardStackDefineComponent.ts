import type { BaseCardData } from "../types";
import VueCardStack from "./VueCardStack.vue";

/**
 * Type-safe VueCardStack component with generic support
 * This provides better type inference for custom card properties
 */
export function createVueCardStack<T extends BaseCardData = BaseCardData>() {
  return VueCardStack as typeof VueCardStack & {
    new (): {
      $props: {
        cards: T[];
        cardWidth?: number;
        cardHeight?: number;
        stackWidth?: number | string | null;
        sensitivity?: number;
        maxVisibleCards?: number;
        scaleMultiplier?: number;
        speed?: number;
        paddingHorizontal?: number;
        paddingVertical?: number;
      };
      $slots: {
        card: (props: {
          card: T & {
            _id: number;
            _index: number;
            xPos: number;
            yPos: number;
            scale: number;
            opacity: number;
            display: string;
            zIndex: number;
            width: number;
            height: number;
            isDragging: boolean;
            $index: number;
          };
        }) => any;
        nav: (props: {
          activeCardIndex: number;
          onNext: () => void;
          onPrevious: () => void;
        }) => any;
      };
    };
  };
}

// Export the raw component for direct use
export { VueCardStack };
