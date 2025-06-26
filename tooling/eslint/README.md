# @card-stack/eslint-config

Professional ESLint configuration for Vue Card Stack monorepo with TypeScript, Vue 3, and accessibility support.

## 🎯 Features

- **TypeScript-first**: Comprehensive TypeScript rules with strict type checking
- **Vue 3 optimized**: Modern Vue development patterns and Composition API best practices
- **Accessibility focused**: Built-in accessibility rules for inclusive UI components
- **Performance oriented**: Rules optimized for library development and bundle size
- **Security hardened**: Security-focused linting rules to prevent common vulnerabilities
- **Monorepo ready**: Turbo-optimized configuration for monorepo development
- **Modern standards**: ES2022+ syntax support with latest JavaScript features

## 📦 Installation

This package is part of the Vue Card Stack monorepo and is used internally. For external projects, you can use it as a reference or fork it.

```bash
# If using in an external project
pnpm add -D @card-stack/eslint-config
```

## 🚀 Usage

### Base Configuration (TypeScript/JavaScript)

```js
// eslint.config.js
import baseConfig from '@card-stack/eslint-config/base'

export default baseConfig
```

### Vue Configuration (TypeScript + Vue)

```js
// eslint.config.js
import vueConfig from '@card-stack/eslint-config/vue'

export default vueConfig
```

### Custom Extension

```js
// eslint.config.js
import baseConfig from '@card-stack/eslint-config/base'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(...baseConfig, {
  // Your custom rules
  rules: {
    'your-custom-rule': 'error'
  }
})
```

## 🔧 Configurations

### Base Configuration

The base configuration provides:

- **TypeScript Support**: Comprehensive TypeScript rules and type checking
- **Modern JavaScript**: ES2022+ syntax and features
- **Code Quality**: Strict rules for maintainable and readable code
- **Performance**: Rules focused on runtime performance and bundle optimization
- **Security**: Protection against common security vulnerabilities
- **Import Management**: Organized import sorting and validation

### Vue Configuration

The Vue configuration extends the base with:

- **Vue 3 Patterns**: Composition API and script setup best practices
- **Template Rules**: Vue template accessibility and performance optimization
- **Component Standards**: Consistent component naming and structure
- **Reactivity Rules**: Proper reactive patterns and ref handling
- **Accessibility**: ARIA attributes and screen reader support

## 📋 Rule Categories

### TypeScript Rules

- Strict type checking with `@typescript-eslint/strict`
- Enhanced type safety with optional chaining and nullish coalescing
- Performance-focused async/await patterns
- Proper error handling and promise management

### Vue Rules

- Composition API best practices
- Template accessibility enforcement
- Performance optimization patterns
- Component lifecycle management
- Reactive data handling

### Code Quality Rules

- Consistent formatting (integrated with Prettier)
- Performance-focused patterns
- Security vulnerability prevention
- Import organization and optimization

## 🎛️ Customization

### Disabling Rules

```js
export default typescriptEslint.config(...baseConfig, {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/require-default-prop': 'off'
  }
})
```

### Adding Custom Rules

```js
export default typescriptEslint.config(...baseConfig, {
  rules: {
    'prefer-const': 'error',
    'no-var': 'error'
  }
})
```

### File-Specific Overrides

```js
export default typescriptEslint.config(...baseConfig, {
  files: ['**/*.test.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
})
```

## 🔗 Dependencies

- **ESLint 9.0+**: Modern flat config system
- **TypeScript ESLint**: Enhanced TypeScript support
- **Vue ESLint Plugin**: Vue 3 specific rules
- **ESLint Config Prettier**: Prettier integration
- **ESLint Config Turbo**: Monorepo optimization

## 📖 Rule Documentation

For detailed information about specific rules:

- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [Vue ESLint Rules](https://eslint.vuejs.org/rules/)
- [ESLint Core Rules](https://eslint.org/docs/rules/)

## 🤝 Contributing

This configuration is part of the Vue Card Stack monorepo. Contributions should be made to the main repository.

## 📄 License

MIT License - see the main repository for details.

---

**Made with ❤️ by ReactivePixels**
