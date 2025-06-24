import { default as VueCardStack } from './components/VueCardStack.vue';

export * from './types';
export { VueCardStack };
export declare const VueCardStackPlugin: {
    install: (app: any) => void;
};
declare global {
    interface Window {
        Vue?: any;
    }
}
