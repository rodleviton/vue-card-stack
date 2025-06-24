import {
  ref,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  shallowRef,
  type Ref,
} from "vue";
import type { CardStackConfig, InternalCard, DragEvent } from "../types";
import { useStackCalculations } from "./useStackCalculations";
import { useDragHandling } from "./useDragHandling";
import { debounce } from "../utils/debounce";

/**
 * Main composable for card stack functionality
 */
export function useCardStack<T = any>(
  cards: Ref<T[]>,
  config: Ref<CardStackConfig>,
  elementRef: Ref<HTMLElement | null>,
  emit: (event: "move", value: number) => void
) {
  // Reactive state - using shallowRef for performance
  const stack = shallowRef<(T & InternalCard<T>)[]>([]);
  const width = ref(0);
  const activeCardIndex = ref(1);

  // Use calculations composable
  const calculations = useStackCalculations(
    cards,
    config,
    elementRef,
    width,
    ref(false)
  );

  // Use drag handling composable
  const dragHandling = useDragHandling(config, calculations.elementXPosOffset);

  /**
   * Initialize the card stack
   */
  const init = () => {
    // Move bottom card to top of stack (positioned offscreen)
    const cardsCopy = [...cards.value];
    const lastCard = cardsCopy.pop();
    if (lastCard) {
      cardsCopy.unshift(lastCard);
    }

    stack.value = cardsCopy.map((card, index) => {
      const defaults = calculations.cardDefaults.value[index];
      return {
        _id: Date.now() + index,
        _index: index,
        ...card,
        ...defaults,
      } as T & InternalCard<T>;
    });
  };

  /**
   * Rebuild stack with updated calculations
   */
  const rebuild = () => {
    nextTick(() => {
      stack.value = stack.value.map((card, index) => {
        const defaults = calculations.cardDefaults.value[index];
        return {
          ...card,
          ...defaults,
        };
      });
    });
  };

  /**
   * Handle resize events with debouncing
   */
  const handleResize = debounce(() => {
    if (elementRef.value) {
      width.value = elementRef.value.clientWidth;
      rebuild();
    }
  }, 250);

  /**
   * Move to next card
   */
  const onNext = () => {
    const cardToMoveToBottom = stack.value.shift();
    if (cardToMoveToBottom) {
      stack.value.push(cardToMoveToBottom);
    }
    rebuild();
  };

  /**
   * Move to previous card
   */
  const onPrevious = () => {
    const cardToMoveToTop = stack.value.pop();
    if (cardToMoveToTop) {
      stack.value.unshift(cardToMoveToTop);
    }
    rebuild();
  };

  /**
   * Update stack positions during drag
   */
  const moveStack = (dragXPos: number) => {
    const activeCardOffset = dragXPos - dragHandling.dragStartX.value;

    emit(
      "move",
      activeCardOffset /
        (config.value.cardWidth + config.value.paddingHorizontal)
    );

    // Determine active card based on drag direction
    activeCardIndex.value = dragHandling.isDraggingRight.value ? 1 : 0;

    stack.value = stack.value.map((card, index) => {
      const isActiveCard = index === activeCardIndex.value;
      const defaults = calculations.cardDefaults.value[index];

      const xPos = isActiveCard
        ? (defaults.xPos ?? 0) + activeCardOffset
        : (defaults.xPos ?? 0) +
          (calculations.xPosOffset.value /
            (config.value.cardWidth + config.value.paddingHorizontal)) *
            activeCardOffset;

      const scale = isActiveCard
        ? defaults.scale ?? 1
        : (defaults.scale ?? 1) +
          (calculations.scaleMultiplier.value /
            (config.value.cardWidth + config.value.paddingHorizontal)) *
            activeCardOffset;

      return {
        ...card,
        ...defaults,
        xPos,
        scale,
        opacity:
          index === 0 && !dragHandling.isDraggingRight.value
            ? 1
            : defaults.opacity ?? 1,
      };
    });
  };

  /**
   * Finalize stack position after drag ends
   */
  const updateStack = () => {
    const activeCard = stack.value[activeCardIndex.value];
    const activeCardRestPoint =
      calculations.stackRestPoints.value[activeCardIndex.value];
    const distanceTravelled = activeCard.xPos - activeCardRestPoint;

    emit("move", 0);

    if (dragHandling.shouldChangeCard(distanceTravelled)) {
      if (dragHandling.isDraggingRight.value) {
        onNext();
      } else {
        onPrevious();
      }
    } else {
      rebuild();
    }
  };

  /**
   * Handle touch/mouse start
   */
  const onTouchStart = (e: DragEvent) => {
    dragHandling.startDrag(e);
    document.addEventListener(dragHandling.dragEvent.value, onDrag);
  };

  /**
   * Handle touch/mouse end
   */
  const onTouchEnd = () => {
    dragHandling.endDrag();
    document.removeEventListener(dragHandling.dragEvent.value, onDrag);
    updateStack();
  };

  /**
   * Handle drag movement
   */
  const onDrag = (e: DragEvent) => {
    const dragData = dragHandling.updateDrag(e);
    if (dragData) {
      moveStack(dragData.dragXPos);
    }
  };

  /**
   * Get the original active card index for external access
   */
  const originalActiveCardIndex = computed(() => {
    const activeCard = stack.value[activeCardIndex.value];
    return activeCard?._index ?? 0;
  });

  // Lifecycle management
  onMounted(() => {
    init();
    window.addEventListener("resize", handleResize);
    if (elementRef.value) {
      elementRef.value.addEventListener(
        dragHandling.touchStartEvent.value,
        onTouchStart
      );
    }
    document.addEventListener(dragHandling.touchEndEvent.value, onTouchEnd);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    if (elementRef.value) {
      elementRef.value.removeEventListener(
        dragHandling.touchStartEvent.value,
        onTouchStart
      );
    }
    document.removeEventListener(dragHandling.touchEndEvent.value, onTouchEnd);
    document.removeEventListener(dragHandling.dragEvent.value, onDrag);
  });

  return {
    // State
    stack,

    // Computed from calculations
    containerWidth: calculations.containerWidth,

    // Computed
    originalActiveCardIndex,

    // Drag state
    isDragging: dragHandling.isDragging,

    // Methods
    onNext,
    onPrevious,

    // For advanced usage
    init,
    rebuild,
  };
}
