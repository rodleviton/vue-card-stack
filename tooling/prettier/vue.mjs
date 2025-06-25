import baseConfig from './base.mjs'

/** @type {import("prettier").Config} */
const config = {
  ...baseConfig,
  plugins: [...(baseConfig.plugins || []), 'prettier-plugin-vue'],
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue'
      }
    }
  ],
  vueIndentScriptAndStyle: true
}

export default config
