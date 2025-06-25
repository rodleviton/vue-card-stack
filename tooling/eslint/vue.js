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
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          }
        }
      ],
      'vue/multi-word-component-names': 'error'
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
