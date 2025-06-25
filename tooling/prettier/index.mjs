/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  printWidth: 100,
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: [
    'prettier-plugin-vue',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
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
