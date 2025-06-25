import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue
    },
    rules: {
      'vue/no-unused-vars': 'error',
      'vue/script-setup-uses-vars': 'error',
      'vue/no-unused-components': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'error',
      // Disable formatting rules that conflict with Prettier
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off'
    },
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 'latest'
      },
      globals: {
        ...globals.browser
      }
    }
  }
]
