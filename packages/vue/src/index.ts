import VueCardStack from "./components/VueCardStack.vue";
export * from "./types";

// Export the component and plugin
export { VueCardStack };

export const VueCardStackPlugin = {
  install: (app: any) => {
    app.component("VueCardStack", VueCardStack);
  },
};

// For Vue.use() support
declare global {
  interface Window {
    Vue?: any;
  }
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component("VueCardStack", VueCardStack);
}
