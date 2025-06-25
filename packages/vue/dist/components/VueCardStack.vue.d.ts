import { CardStackProps, BaseCardData } from '../types';

declare const _default: <T extends BaseCardData>(__VLS_props: Awaited<typeof __VLS_setup>["props"], __VLS_ctx?: __VLS_Prettify<Pick<Awaited<typeof __VLS_setup>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_Prettify<__VLS_OmitKeepDiscriminatedUnion<(Partial<{}> & Omit<{
        readonly onMove?: ((value: number) => any) | undefined;
    } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>) & CardStackProps<T>, keyof import('vue').VNodeProps | keyof import('vue').AllowedComponentProps>> & {} & (import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps);
    expose(exposed: import('vue').ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: ReturnType<() => {
        card?(_: {
            card: T & {
                $index: number;
                data: Omit<T & import('..').InternalCard, "_id" | "_index">;
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
            };
        }): any;
        nav?(_: {
            activeCardIndex: number;
            onNext: () => void;
            onPrevious: () => void;
        }): any;
    }>;
    emit: (evt: "move", value: number) => void;
}>) => import('vue').VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
