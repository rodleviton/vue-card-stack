# @card-stack/prettier-config

Professional Prettier configuration for Vue Card Stack monorepo with TypeScript, Vue 3, and automatic import sorting.

## 🎯 Features

- **Consistent Formatting**: Unified code style across TypeScript, Vue, and JavaScript
- **Import Sorting**: Automatic import organization with logical grouping
- **Vue Support**: Optimized formatting for Vue Single File Components (SFCs)
- **Tailwind CSS**: Automatic class sorting for Tailwind CSS
- **JSDoc Preservation**: Maintains documentation formatting
- **Monorepo Optimized**: Consistent formatting across all packages
- **Modern Standards**: Optimized for readability and maintainability

## 📦 Installation

This package is part of the Vue Card Stack monorepo and is used internally. For external projects, you can use it as a reference or fork it.

```bash
# If using in an external project
pnpm add -D @card-stack/prettier-config
```

## 🚀 Usage

### Basic Setup

```json
{
  "prettier": "@card-stack/prettier-config"
}
```

### Extended Configuration

```js
// prettier.config.js
import baseConfig from '@card-stack/prettier-config'

export default {
  ...baseConfig,
  // Your overrides
  printWidth: 120
}
```

### Package.json Configuration

```json
{
  "prettier": "@card-stack/prettier-config",
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## ⚙️ Configuration Details

### Core Formatting Rules

```js
{
  // Use single quotes for strings
  singleQuote: true,

  // No semicolons for cleaner look
  semi: false,

  // 2-space indentation
  tabWidth: 2,

  // No trailing commas
  trailingComma: 'none',

  // 100 character line length
  printWidth: 100,

  // Space inside object literals
  bracketSpacing: true,

  // Always parentheses around arrow function parameters
  arrowParens: 'always'
}
```

### Import Sorting Configuration

The configuration automatically sorts imports in this order:

1. **Node.js built-ins** (`node:fs`, `node:path`)
2. **External packages** (`vue`, `typescript`, etc.)
3. **Internal packages** (`@card-stack/...`)
4. **Relative imports** (`../`, `./`)
5. **Type-only imports** (always last)

Example:

```ts
import { validateCard } from '../utils'
import type { LocalConfig } from './config'
import { CardData } from './types'
import { useCardStack } from '@card-stack/vue'
import { readFile } from 'node:fs'
import { computed, ref } from 'vue'
import type { Component } from 'vue'
```

### File-Specific Overrides

#### JSON Files

```json
{
  "singleQuote": false,
  "trailingComma": "none"
}
```

#### Markdown Files

```js
{
  "printWidth": 80,
  "proseWrap": "always",
  "singleQuote": false
}
```

#### Vue Files

```js
{
  "printWidth": 100,
  "singleAttributePerLine": true
}
```

#### YAML Files

```js
{
  "singleQuote": false,
  "bracketSpacing": true
}
```

## 🔧 Plugins

### Import Sorting Plugin

Automatically organizes and sorts imports:

- Groups imports by source type
- Adds blank lines between groups
- Sorts specifiers within imports
- Combines type and value imports when possible

### Tailwind CSS Plugin

Automatically sorts Tailwind CSS classes for consistency:

```vue
<!-- Before -->
<div class="rounded-lg bg-blue-500 p-4 text-white shadow-md"></div>
```

## 📝 IDE Integration

### VS Code

Add to your `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

### WebStorm/IntelliJ

1. Go to **Settings** → **Languages & Frameworks** → **JavaScript** → **Prettier**
2. Set **Prettier package** to your node_modules path
3. Check **On code reformat** and **On save**

## 🎨 Customization

### Overriding Settings

```js
// prettier.config.js
import baseConfig from '@card-stack/prettier-config'

export default {
  ...baseConfig,
  printWidth: 120,
  singleQuote: false,
  // Custom import order
  importOrder: ['^@core/(.*)$', '^@/(.*)$', '^[./]']
}
```

### Project-Specific Rules

```js
// prettier.config.js
import baseConfig from '@card-stack/prettier-config'

export default {
  ...baseConfig,
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 120,
        proseWrap: 'never'
      }
    }
  ]
}
```

## 📋 Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "format:staged": "prettier --write $(git diff --cached --name-only --diff-filter=ACMR | grep -E '\\.(js|jsx|ts|tsx|vue|json|md)$')"
  }
}
```

## 🔗 Dependencies

- **Prettier 3.5+**: Core formatting engine
- **@trivago/prettier-plugin-sort-imports**: Import sorting
- **prettier-plugin-tailwindcss**: Tailwind CSS class sorting

## 🚫 Ignore Files

Create a `.prettierignore` file:

```
# Build outputs
dist/
build/
.next/

# Package managers
node_modules/
pnpm-lock.yaml

# Generated files
*.d.ts
coverage/

# Cache
.turbo/
.cache/
```

## 🤝 Contributing

This configuration is part of the Vue Card Stack monorepo. Contributions should be made to the main repository.

## 📄 License

MIT License - see the main repository for details.

---

**Made with ❤️ by ReactivePixels**
