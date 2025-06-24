import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueCardStack",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ["vue", "@card-stack/core"],
      output: {
        globals: {
          vue: "Vue",
          "@card-stack/core": "CardStackCore",
        },
        assetFileNames: "style.css",
      },
    },
  },
});
