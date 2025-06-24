import { Ref } from 'vue';
import { CardStackConfig, InternalCard } from '../types';

/**
 * Main composable for card stack functionality
 */
export declare function useCardStack<T = any>(cards: Ref<T[]>, config: Ref<CardStackConfig>, elementRef: Ref<HTMLElement | null>, emit: (event: "move", value: number) => void): {
    stack: import('vue').ShallowRef<(T & InternalCard<T>)[], (T & InternalCard<T>)[]>;
    containerWidth: import('vue').ComputedRef<string>;
    originalActiveCardIndex: import('vue').ComputedRef<number>;
    isDragging: Ref<boolean, boolean>;
    onNext: () => void;
    onPrevious: () => void;
    init: () => void;
    rebuild: () => void;
};
