/**
 * @fileoverview Prettier configuration for Card Stack monorepo
 *
 * This configuration provides consistent code formatting across all packages
 * with modern best practices and optimized import organization.
 *
 * Features:
 * - Consistent formatting for JavaScript, TypeScript, Vue, and JSON
 * - Optimized import sorting with grouping and separation
 * - Tailwind CSS class sorting for better maintainability
 * - Modern formatting preferences aligned with current standards
 * - Performance-optimized settings for large codebases
 *
 * @author ReactivePixels
 * @version 1.0.0
 * @license MIT
 */

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@trivago/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/**
 * Comprehensive Prettier configuration with modern formatting standards
 * @type {PrettierConfig & SortImportsConfig}
 */
const config = {
  // Core formatting options
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  printWidth: 100,
  endOfLine: 'lf',

  // Object and array formatting
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',

  // String formatting
  quoteProps: 'as-needed',

  // Vue-specific formatting
  vueIndentScriptAndStyle: false,

  // Import sorting configuration for better code organization
  importOrder: [
    // 1. Node.js built-in modules
    '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process)(/.*|$)',

    // 2. External packages (npm packages)
    '^[a-z]',
    '^@[a-z]',

    // 3. Vue ecosystem packages
    '^vue',
    '^@vue',
    '^vite',
    '^@vite',

    // 4. Internal packages (monorepo packages)
    '^@card-stack/',

    // 5. Relative imports from parent directories
    '^\\.\\./',

    // 6. Relative imports from current directory
    '^\\.',

    // 7. Type-only imports (should come last)
    '^.*\\u0000$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: false,

  // Plugins for enhanced functionality
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  // Language-specific overrides for optimal formatting
  overrides: [
    {
      files: ['*.vue'],
      options: {
        parser: 'vue',
        vueIndentScriptAndStyle: true
      }
    },
    {
      files: ['*.json', '*.jsonc'],
      options: {
        printWidth: 120,
        tabWidth: 2
      }
    },
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 80,
        proseWrap: 'always',
        embeddedLanguageFormatting: 'auto'
      }
    },
    {
      files: ['*.yaml', '*.yml'],
      options: {
        tabWidth: 2,
        singleQuote: false
      }
    },
    {
      files: ['package.json'],
      options: {
        printWidth: 120,
        tabWidth: 2,
        plugins: [] // Disable import sorting for package.json
      }
    }
  ]
}

export default config
