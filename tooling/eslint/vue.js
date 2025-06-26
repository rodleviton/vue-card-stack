import baseConfig from './base.js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  ...baseConfig.map((config) => {
    if (config.files) {
      return {
        ...config,
        files: [...config.files, '**/*.vue']
      }
    }
    return config
  }),
  {
    files: ['**/*.vue'],
    extends: [...eslintPluginVue.configs['flat/recommended'], eslintConfigPrettier],
    languageOptions: {
      parserOptions: {
        parser: typescriptEslint.parser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
)
