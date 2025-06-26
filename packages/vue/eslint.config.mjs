import eslintConfigBase from '@card-stack/eslint-config/base'
import eslintConfigVue from '@card-stack/eslint-config/vue'

export default [
  {
    ignores: ['vite.config.ts', '*.config.ts', '*.config.js']
  },
  ...eslintConfigBase,
  ...eslintConfigVue
]
