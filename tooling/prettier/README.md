# @card-stack/prettier-config

> Modern Prettier configuration for the Card Stack monorepo with intelligent
> import sorting and multi-language support.

## Overview

This package provides a comprehensive Prettier configuration that ensures
consistent code formatting across JavaScript, TypeScript, Vue, and other file
types, with intelligent import organization and language-specific optimizations.

## Features

### 🎨 **Consistent Formatting**

- Modern formatting standards aligned with current best practices
- Language-specific optimizations for Vue, JSON, Markdown, and YAML
- Intelligent import sorting with logical grouping
- Tailwind CSS class organization

### 📦 **Import Organization**

- Automatic import sorting with intelligent grouping
- Separation of external packages, internal modules, and relative imports
- Type-only import handling for TypeScript
- Merge duplicate imports for cleaner code

### 🔧 **Multi-Language Support**

- Vue SFC (Single File Component) formatting
- JSON and JSONC with appropriate line lengths
- Markdown with prose wrapping
- YAML with proper indentation

## Configuration

### Core Settings

```js
{
  semi: false,              // No semicolons
  singleQuote: true,        // Single quotes for strings
  tabWidth: 2,              // 2-space indentation
  trailingComma: 'none',    // No trailing commas
  printWidth: 100,          // 100 character line limit
  endOfLine: 'lf'           // Unix line endings
}
```

### Import Sorting

Imports are automatically organized in this order:

1. **Node.js built-in modules** (`fs`, `path`, etc.)
2. **External packages** (npm packages)
3. **Vue ecosystem** (`vue`, `@vue/*`, `vite`)
4. **Internal packages** (`@card-stack/*`)
5. **Parent directory imports** (`../`)
6. **Current directory imports** (`./`)
7. **Type-only imports** (TypeScript types)

### Language Overrides

#### Vue Files

```json
{
  "parser": "vue",
  "vueIndentScriptAndStyle": true
}
```

#### JSON Files

```json
{
  "printWidth": 120,
  "tabWidth": 2
}
```

#### Markdown Files

```json
{
  "printWidth": 80,
  "proseWrap": "always",
  "embeddedLanguageFormatting": "auto"
}
```

## Usage

### Basic Setup

```js
// prettier.config.js
import prettierConfig from "@card-stack/prettier-config"

export default prettierConfig
```

### Package.json

```json
{
  "prettier": "@card-stack/prettier-config"
}
```

### With Custom Overrides

```js
import prettierConfig from "@card-stack/prettier-config"

export default {
  ...prettierConfig,
  // Your custom overrides
  printWidth: 120
}
```

## Plugins

This configuration includes:

### @trivago/prettier-plugin-sort-imports

- Intelligent import grouping and sorting
- Configurable import order patterns
- Duplicate import merging
- TypeScript support

### prettier-plugin-tailwindcss

- Automatic Tailwind CSS class sorting
- Consistent class order for better readability
- Integration with Vue templates and JSX

## Scripts

### Format Check

```bash
pnpm prettier --check "**/*.{js,ts,vue,json,md}"
```

### Format Write

```bash
pnpm prettier --write "**/*.{js,ts,vue,json,md}"
```

### Format Specific Files

```bash
pnpm prettier --write src/**/*.vue
```

## IDE Integration

### VS Code

Add to your `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Other IDEs

Most modern IDEs support Prettier with the configuration file automatically
detected.

## File Types Supported

- **JavaScript/TypeScript**: `.js`, `.ts`, `.mjs`, `.cjs`
- **Vue**: `.vue` files with SFC support
- **JSON**: `.json`, `.jsonc` with comment support
- **Markdown**: `.md`, `.mdx` with prose wrapping
- **YAML**: `.yml`, `.yaml` with proper indentation
- **CSS/SCSS**: `.css`, `.scss`, `.sass`

## Performance

The configuration is optimized for:

- Fast formatting with minimal overhead
- Efficient import sorting with caching
- Language-specific optimizations
- Monorepo-aware file handling

## Contributing

When modifying the configuration:

1. Test with all supported file types
2. Ensure compatibility with existing codebase
3. Consider impact on import organization
4. Update documentation for new features

## License

MIT - See the main project license for details.

---

**Made with ❤️ by ReactivePixels**
