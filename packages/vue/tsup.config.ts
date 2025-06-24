import { defineConfig } from "tsup";
import vuePlugin from "esbuild-plugin-vue-next";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  esbuildPlugins: [vuePlugin()],
  external: ["vue"],
  define: {
    __VUE_OPTIONS_API__: '"true"',
    __VUE_PROD_DEVTOOLS__: '"false"',
  },
});
