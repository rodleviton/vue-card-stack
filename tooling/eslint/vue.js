/**
 * @fileoverview Vue-specific ESLint configuration for Card Stack monorepo
 *
 * This configuration extends the base configuration with Vue 3 specific rules,
 * including Composition API best practices, template accessibility, and performance optimizations.
 *
 * Features:
 * - Vue 3 Composition API optimization rules
 * - Template accessibility (a11y) enforcement
 * - Vue SFC (Single File Component) best practices
 * - TypeScript integration for Vue components
 * - Performance-focused Vue template rules
 * - Script setup and modern Vue patterns
 *
 * @author ReactivePixels
 * @version 1.0.0
 */
import baseConfig from "./base.js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import typescriptEslint from "typescript-eslint";

/**
 * Vue-enhanced ESLint configuration with modern Vue 3 practices
 * @type {import('eslint').Linter.Config[]}
 */
export default typescriptEslint.config(
  // Extend base configuration for Vue files
  ...baseConfig.map((config) => {
    if (config.files) {
      return {
        ...config,
        name: config.name ? `${config.name}/vue-extended` : "vue-extended",
        files: [...config.files, "**/*.vue"],
      };
    }
    return config;
  }),

  // Vue-specific configuration
  {
    name: "card-stack/vue",
    files: ["**/*.vue"],
    extends: [...eslintPluginVue.configs["flat/recommended"], eslintConfigPrettier],
    languageOptions: {
      parserOptions: {
        parser: typescriptEslint.parser,
        extraFileExtensions: [".vue"],
        ecmaFeatures: {
          jsx: true, // Enable JSX for Vue render functions
        },
        // Enable type-aware linting for Vue files with project service
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs", "*.cjs"],
        },
      },
    },
    rules: {
      // Vue 3 Composition API specific rules
      "vue/prefer-true-attribute-shorthand": "error",
      "vue/component-api-style": ["error", ["script-setup", "composition"]],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/component-options-name-casing": ["error", "PascalCase"],
      "vue/custom-event-name-casing": "error",
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
        },
      ],
      "vue/define-emits-declaration": ["error", "type-based"],
      "vue/define-props-declaration": ["error", "type-based"],

      // Template best practices and performance
      "vue/no-useless-mustaches": "error",
      "vue/no-useless-v-bind": "error",
      "vue/no-v-text-v-html-on-component": "error",
      "vue/padding-line-between-blocks": "error",
      "vue/prefer-template": "error",

      "vue/v-for-delimiter-style": ["error", "in"],
      "vue/v-on-event-hyphenation": ["error", "always"],

      // Accessibility (a11y) rules for better UX
      "vue/require-explicit-emits": "error",

      // Code quality and maintainability
      "vue/block-tag-newline": "error",
      "vue/html-button-has-type": "error",
      "vue/html-comment-content-spacing": "error",
      "vue/html-comment-indent": "error",
      "vue/next-tick-style": ["error", "promise"],

      "vue/no-duplicate-attr-inheritance": "error",
      "vue/no-empty-component-block": "error",
      "vue/no-multiple-objects-in-class": "error",
      "vue/no-potential-component-option-typo": "error",
      "vue/no-ref-object-destructure": "error",
      "vue/no-required-prop-with-default": "error",
      "vue/no-this-in-before-route-enter": "error",
      "vue/no-undef-components": "error",
      "vue/no-undef-properties": "error",
      "vue/no-unused-properties": "error",
      "vue/no-unused-refs": "error",
      "vue/no-use-computed-property-like-method": "error",
      "vue/no-useless-template-attributes": "error",

      // Performance optimizations
      "vue/no-watch-after-await": "error",

      // Script setup specific rules
      "vue/script-setup-uses-vars": "error",
      "vue/valid-define-emits": "error",
      "vue/valid-define-props": "error",

      // Template style consistency
      "vue/array-bracket-newline": ["error", "consistent"],
      "vue/array-bracket-spacing": "error",
      "vue/arrow-spacing": "error",
      "vue/block-spacing": "error",
      "vue/brace-style": "error",
      "vue/comma-dangle": ["error", "never"],
      "vue/comma-spacing": "error",
      "vue/comma-style": "error",
      "vue/dot-location": ["error", "property"],
      "vue/dot-notation": "error",
      "vue/eqeqeq": "error",
      "vue/func-call-spacing": "error",
      "vue/key-spacing": "error",
      "vue/keyword-spacing": "error",
      "vue/no-constant-condition": "error",
      "vue/no-empty-pattern": "error",
      "vue/no-extra-parens": ["error", "functions"],
      "vue/no-irregular-whitespace": "error",
      "vue/no-loss-of-precision": "error",
      "vue/no-restricted-syntax": "error",
      "vue/no-sparse-arrays": "error",
      "vue/object-curly-newline": ["error", { consistent: true }],
      "vue/object-curly-spacing": ["error", "always"],
      "vue/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
      "vue/object-shorthand": "error",
      "vue/operator-linebreak": ["error", "before"],
      "vue/prefer-template": "error",
      "vue/quote-props": ["error", "as-needed"],
      "vue/space-in-parens": "error",
      "vue/space-infix-ops": "error",
      "vue/space-unary-ops": "error",
      "vue/template-curly-spacing": "error",

      // Disable conflicting rules with TypeScript
      "vue/require-default-prop": "off", // TypeScript handles this better
      "vue/require-prop-types": "off", // TypeScript handles this better

      // Adjust severity of some rules for better DX
      "vue/multi-word-component-names": "warn", // Sometimes single words are fine
      "vue/no-v-html": "warn", // Sometimes v-html is necessary, but warn to be careful
    },
  },
);
