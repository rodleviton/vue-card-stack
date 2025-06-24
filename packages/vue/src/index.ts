import VueCardStack from "./VueCardStack.vue";

// Export the component
export { VueCardStack };

// Default export
export default {
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
