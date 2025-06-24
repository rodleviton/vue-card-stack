import { Ref } from 'vue';
import { DragEvent, CardStackConfig } from '../types';

/**
 * Composable for handling drag and touch interactions
 */
export declare function useDragHandling(config: Ref<CardStackConfig>, elementXPosOffset: Ref<number>): {
    isDragging: Ref<boolean, boolean>;
    dragStartX: Ref<number, number>;
    dragStartY: Ref<number, number>;
    isDraggingRight: Ref<boolean, boolean>;
    isTouch: import('vue').ComputedRef<boolean>;
    dragEvent: import('vue').ComputedRef<"touchmove" | "mousemove">;
    touchStartEvent: import('vue').ComputedRef<"touchstart" | "mousedown">;
    touchEndEvent: import('vue').ComputedRef<"touchend" | "mouseup">;
    getDragXPos: (e: DragEvent) => number;
    getDragYPos: (e: DragEvent) => number;
    startDrag: (e: DragEvent) => void;
    updateDrag: (e: DragEvent) => {
        dragXPos: number;
        activeCardOffset: number;
    } | null;
    endDrag: () => void;
    shouldChangeCard: (distanceTravelled: number) => boolean;
    resetDragState: () => void;
};
