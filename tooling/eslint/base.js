/**
 * @fileoverview Base ESLint configuration for Card Stack monorepo
 *
 * This configuration provides a comprehensive foundation for JavaScript and TypeScript
 * projects with modern best practices, performance optimizations, and strict quality rules.
 *
 * Features:
 * - Modern ES2021+ support with latest ECMAScript features
 * - Strict TypeScript rules for type safety
 * - Performance-focused rules for optimal code
 * - Security-focused rules to prevent common vulnerabilities
 * - Import/export optimization rules
 * - Accessibility and code quality enforcement
 *
 * @author ReactivePixels
 * @version 1.0.0
 */
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboConfig from "eslint-config-turbo/flat";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

/**
 * Comprehensive ESLint configuration with modern best practices
 * @type {import('eslint').Linter.Config[]}
 */
export default typescriptEslint.config(
  // Global ignores for performance and relevance
  {
    name: "card-stack/ignores",
    ignores: [
      // Dependencies and generated files
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",

      // Generated TypeScript files
      "**/*.d.ts",
      "**/generated/**",

      // Package manager files
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",

      // IDE and OS files
      "**/.DS_Store",
      "**/Thumbs.db",
      "**/.vscode/**",
      "**/.idea/**",

      // Temporary and cache files
      "**/.turbo/**",
      "**/.cache/**",
      "**/tmp/**",
      "**/temp/**",
    ],
  },

  // Base configuration for JavaScript and TypeScript files
  {
    name: "card-stack/base",
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...typescriptEslint.configs.recommendedTypeChecked,
      ...turboConfig,
    ],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        parser: typescriptEslint.parser,
        ecmaFeatures: {
          jsx: false, // Overridden in Vue config
          impliedStrict: true,
        },
        // Enable type-aware linting with project service (modern approach)
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs", "*.cjs"],
        },
      },
    },
    rules: {
      // TypeScript-specific rules for enhanced type safety
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",

      // General JavaScript/ECMAScript rules for code quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unused-expressions": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "prefer-spread": "error",
      "prefer-rest-params": "error",
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true,
        },
      ],

      // Performance and optimization rules
      "no-await-in-loop": "warn",
      "no-constant-binary-expression": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",

      // Code style and consistency (complementing Prettier)
      "consistent-return": "error",
      curly: ["error", "all"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "grouped-accessor-pairs": "error",
      "new-cap": "error",
      "no-array-constructor": "error",
      "no-lonely-if": "error",
      "no-nested-ternary": "error",
      "no-new-object": "error",
      "no-unneeded-ternary": "error",
      "object-shorthand": "error",
      "one-var": ["error", "never"],
      "operator-assignment": "error",
      "prefer-exponentiation-operator": "error",
      "prefer-object-spread": "error",
      "spaced-comment": [
        "error",
        "always",
        {
          line: { markers: ["/"] },
          block: { markers: ["*"], balanced: true },
        },
      ],
    },
  },

  // Prettier integration - must be last to override conflicting rules
  {
    name: "card-stack/prettier",
    ...eslintConfigPrettier,
  },
);
