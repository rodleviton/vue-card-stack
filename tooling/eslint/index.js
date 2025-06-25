module.exports = {
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "turbo/no-undeclared-env-vars": "off"
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".turbo/",
    "coverage/",
    "*.config.js",
    "*.config.ts"
  ]
} 