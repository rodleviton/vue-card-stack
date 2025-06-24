import { CardStackProps } from '../types';

declare function __VLS_template(): {
    card?(_: {
        card: any;
    }): any;
    nav?(_: {
        activeCardIndex: number;
        onNext: () => void;
        onPrevious: () => void;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<CardStackProps<any>>, {
    cardWidth: number;
    cardHeight: number;
    stackWidth: null;
    sensitivity: number;
    maxVisibleCards: number;
    scaleMultiplier: number;
    speed: number;
    paddingHorizontal: number;
    paddingVertical: number;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    move: (value: number) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<CardStackProps<any>>, {
    cardWidth: number;
    cardHeight: number;
    stackWidth: null;
    sensitivity: number;
    maxVisibleCards: number;
    scaleMultiplier: number;
    speed: number;
    paddingHorizontal: number;
    paddingVertical: number;
}>>> & Readonly<{
    onMove?: ((value: number) => any) | undefined;
}>, {
    cardWidth: number;
    cardHeight: number;
    stackWidth: number | string | null;
    sensitivity: number;
    maxVisibleCards: number;
    scaleMultiplier: number;
    speed: number;
    paddingHorizontal: number;
    paddingVertical: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
