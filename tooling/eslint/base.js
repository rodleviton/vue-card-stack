import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import globals from 'globals';
import turboConfig from 'eslint-config-turbo/flat';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  turboConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  },
  {
    ignores: [
      '**/node_modules',
      'dist',
      'pnpm-lock.yaml'
    ]
  }
);
