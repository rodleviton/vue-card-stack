import { Ref } from 'vue';
import { CardStackConfig } from '../types';

/**
 * Composable for card stack calculations and positioning
 */
export declare function useStackCalculations<T = any>(cards: Ref<T[]>, config: Ref<CardStackConfig>, elementRef: Ref<HTMLElement | null>, width: Ref<number>, isDragging: Ref<boolean>): {
    stackWidth: import('vue').ComputedRef<number>;
    maxVisibleCards: import('vue').ComputedRef<number>;
    scaleMultiplier: import('vue').ComputedRef<number>;
    containerWidth: import('vue').ComputedRef<string>;
    xPosOffset: import('vue').ComputedRef<number>;
    stackRestPoints: import('vue').ComputedRef<number[]>;
    cardDefaults: import('vue').ComputedRef<{
        opacity: number;
        display: string;
        xPos: number;
        yPos: number;
        scale: number;
        width: number;
        height: number;
        zIndex: number;
        isDragging: boolean;
    }[]>;
    elementXPosOffset: import('vue').ComputedRef<number>;
};
