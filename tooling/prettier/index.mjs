/** @typedef {import("prettier").Config} PrettierConfig */

/** @type {PrettierConfig} */
const config = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  printWidth: 100,
  bracketSpacing: true,
  endOfLine: 'lf',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-vue'
  ],
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
