# @card-stack/eslint-config

> Professional ESLint configuration for the Card Stack monorepo with modern best
> practices.

## Overview

This package provides a comprehensive ESLint configuration that enforces modern
JavaScript and TypeScript best practices, including Vue 3 Composition API
patterns, type safety, performance optimizations, and accessibility standards.

## Features

### 🚀 **Modern Standards**

- ES2022+ support with latest ECMAScript features
- TypeScript strict mode with enhanced type checking
- Vue 3 Composition API optimization rules
- Performance-focused linting rules

### 🛡️ **Quality Assurance**

- Security-focused rules to prevent vulnerabilities
- Import/export optimization and organization
- Accessibility (a11y) enforcement for Vue templates
- Consistent code style complementing Prettier

### ⚡ **Performance Optimized**

- Type-aware linting with project references
- Efficient caching with named configurations
- Optimized ignore patterns for better performance

## Configurations

### Base Configuration (`base.js`)

Provides foundation for JavaScript and TypeScript projects:

```js
import eslintConfigBase from "@card-stack/eslint-config/base.js"

export default [...eslintConfigBase]
```

**Features:**

- TypeScript strict rules with type-aware linting
- Modern ES2022+ JavaScript patterns
- Security and performance rules
- Import/export optimization
- Consistent code style enforcement

### Vue Configuration (`vue.js`)

Extends base configuration with Vue 3 specific rules:

```js
import eslintConfigVue from "@card-stack/eslint-config/vue.js"

export default [...eslintConfigVue]
```

**Features:**

- Vue 3 Composition API best practices
- Script setup and `<script setup>` optimization
- Template accessibility (a11y) rules
- Vue SFC (Single File Component) standards
- TypeScript integration for Vue components

## Usage

### Basic Setup

```js
// eslint.config.mjs
import eslintConfigBase from "@card-stack/eslint-config/base.js"
import eslintConfigVue from "@card-stack/eslint-config/vue.js"

export default [...eslintConfigBase, ...eslintConfigVue]
```

### Package-Specific Configuration

For TypeScript-only packages:

```js
import eslintConfigBase from "@card-stack/eslint-config/base.js"

export default [...eslintConfigBase]
```

For Vue packages:

```js
import eslintConfigVue from "@card-stack/eslint-config/vue.js"

export default [...eslintConfigVue]
```

## Rule Categories

### TypeScript Rules

- **Type Safety**: Strict type checking and null safety
- **Modern Patterns**: Optional chaining, nullish coalescing
- **Import Management**: Consistent type imports and exports
- **Performance**: Async/await best practices

### Vue Rules

- **Composition API**: Script setup optimization
- **Accessibility**: Template a11y enforcement
- **Performance**: Reactive patterns and watchers
- **Code Quality**: Component naming and structure

### JavaScript Rules

- **Security**: Prevention of dangerous patterns
- **Performance**: Optimization recommendations
- **Consistency**: Code style and formatting
- **Modern ES**: Latest ECMAScript features

## Dependencies

This configuration includes:

- `@eslint/js` - Core ESLint rules
- `typescript-eslint` - TypeScript-specific rules
- `eslint-plugin-vue` - Vue.js specific rules
- `eslint-config-turbo` - Turbo monorepo optimization
- `eslint-config-prettier` - Prettier integration

## Contributing

When adding new rules:

1. Consider performance impact
2. Ensure rules align with project goals
3. Test with existing codebase
4. Document rule purpose and benefits

## License

MIT - See the main project license for details.

---

**Made with ❤️ by ReactivePixels**
