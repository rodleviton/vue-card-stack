import eslint from '@eslint/js';
import turboConfig from 'eslint-config-turbo/flat';
import tsEsLint from 'typescript-eslint';

export default tsEsLint.config(
  eslint.configs.recommended,
  turboConfig,
  {
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  {
    ignores: [
      '**/node_modules',
      'dist',
      'pnpm-lock.yaml',
    ],
  },
);
