import { computed, ref, type Ref } from "vue";
import type { DragEvent, CardStackConfig } from "../types";

/**
 * Provides reactive state and utility methods for managing drag and touch interactions in a card stack UI.
 *
 * Exposes state variables, computed event names, and methods to handle drag lifecycle, direction detection, and threshold checks for card changes.
 */
export function useDragHandling(
  config: Ref<CardStackConfig>,
  elementXPosOffset: Ref<number>
) {
  // Reactive state
  const isDragging = ref(false);
  const dragStartX = ref(0);
  const dragStartY = ref(0);
  const isDraggingRight = ref(false);

  // Device detection
  const isTouch = computed(() => "ontouchstart" in window);

  // Event type mappings
  const dragEvent = computed(() => (isTouch.value ? "touchmove" : "mousemove"));
  const touchStartEvent = computed(() =>
    isTouch.value ? "touchstart" : "mousedown"
  );
  const touchEndEvent = computed(() =>
    isTouch.value ? "touchend" : "mouseup"
  );

  /**
   * Extract X coordinate from touch or mouse event
   */
  const getDragXPos = (e: DragEvent): number => {
    return isTouch.value
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX;
  };

  /**
   * Extract Y coordinate from touch or mouse event
   */
  const getDragYPos = (e: DragEvent): number => {
    return isTouch.value
      ? (e as TouchEvent).touches[0].clientY
      : (e as MouseEvent).clientY;
  };

  /**
   * Start drag operation
   */
  const startDrag = (e: DragEvent) => {
    isDragging.value = true;
    dragStartX.value = getDragXPos(e) - elementXPosOffset.value;
    dragStartY.value = getDragYPos(e);
  };

  /**
   * Update drag position and direction
   */
  const updateDrag = (e: DragEvent) => {
    if (!isDragging.value) return null;

    const dragXPos = getDragXPos(e) - elementXPosOffset.value;
    isDraggingRight.value = dragXPos > dragStartX.value;

    return {
      dragXPos,
      activeCardOffset: dragXPos - dragStartX.value,
    };
  };

  /**
   * End drag operation
   */
  const endDrag = () => {
    isDragging.value = false;
    dragStartX.value = 0;
    dragStartY.value = 0;
  };

  /**
   * Check if drag distance meets threshold for card change
   */
  const shouldChangeCard = (distanceTravelled: number): boolean => {
    const minDistanceToTravel =
      (config.value.cardWidth + config.value.paddingHorizontal) /
      (1 / config.value.sensitivity);

    return Math.abs(distanceTravelled) > minDistanceToTravel;
  };

  /**
   * Reset drag state
   */
  const resetDragState = () => {
    isDragging.value = false;
    dragStartX.value = 0;
    dragStartY.value = 0;
    isDraggingRight.value = false;
  };

  return {
    // State
    isDragging,
    dragStartX,
    dragStartY,
    isDraggingRight,

    // Computed
    isTouch,
    dragEvent,
    touchStartEvent,
    touchEndEvent,

    // Methods
    getDragXPos,
    getDragYPos,
    startDrag,
    updateDrag,
    endDrag,
    shouldChangeCard,
    resetDragState,
  };
}
