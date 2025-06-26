# @card-stack/tsconfig

Professional TypeScript configuration for Vue Card Stack monorepo with strict type checking and modern ES2022+ support.

## 🎯 Features

- **Modern TypeScript**: Optimized for TypeScript 5.0+ with latest language features
- **Strict Type Checking**: Comprehensive type safety with strict mode enabled
- **ES2022+ Support**: Modern JavaScript features and syntax
- **Vue 3 Ready**: Optimized for Vue 3 development with JSX support
- **Performance Optimized**: Incremental compilation and efficient build caching
- **Monorepo Friendly**: Shared configuration across all packages
- **Library Development**: Optimized for npm package development

## 📦 Installation

This package is part of the Vue Card Stack monorepo and is used internally. For external projects, you can use it as a reference or fork it.

```bash
# If using in an external project
pnpm add -D @card-stack/tsconfig
```

## 🚀 Usage

### Basic Setup

```json
{
  "extends": "@card-stack/tsconfig/base.json"
}
```

### Package-Specific Configuration

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

### Vue Project Configuration

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "types": ["vite/client"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.vue"
  ]
}
```

## ⚙️ Configuration Details

### Language and Environment

```json
{
  "target": "ES2022",
  "lib": [
    "ES2022",
    "DOM",
    "DOM.Iterable",
    "WebWorker"
  ],
  "module": "ESNext",
  "moduleResolution": "Bundler"
}
```

### Strict Type Checking

The configuration enables comprehensive type checking:

```json
{
  "strict": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitAny": true,
  "noImplicitThis": true,
  "noImplicitReturns": true,
  "noImplicitOverride": true,
  "noFallthroughCasesInSwitch": true,
  "noUncheckedIndexedAccess": true,
  "allowUnusedLabels": false,
  "allowUnreachableCode": false
}
```

### Module Resolution

```json
{
  "moduleDetection": "force",
  "allowSyntheticDefaultImports": true,
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "resolveJsonModule": true,
  "isolatedModules": true
}
```

### Performance Optimization

```json
{
  "skipLibCheck": true,
  "incremental": true,
  "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo.json"
}
```

## 🔧 Customization

### Adding Path Mapping

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

### Build Configuration

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist"
  }
}
```

### Library Development

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types",
    "emitDeclarationOnly": true
  }
}
```

## 📋 Included Files

By default, the configuration includes:

- `**/*.ts` - TypeScript files
- `**/*.tsx` - TypeScript JSX files
- `**/*.vue` - Vue Single File Components
- `**/*.js` - JavaScript files
- `**/*.jsx` - JavaScript JSX files
- `**/*.mjs` - ES modules
- `**/*.cjs` - CommonJS modules

## 🚫 Excluded Files

The configuration excludes:

- Build outputs (`dist/`, `build/`, `.next/`)
- Package managers (`node_modules/`)
- Cache directories (`.turbo/`, `.cache/`)
- Test outputs (`test-results/`, `playwright-report/`)
- IDE files (`.vscode/`, `.idea/`)
- System files (`.DS_Store`, `Thumbs.db`)
- Environment files (`.env*`)

## 🎨 Project Types

### Library Package

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "**/*.test.ts"]
}
```

### Vue Application

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "types": ["vite/client", "node"],
    "allowJs": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.vue",
    "src/**/*.js"
  ]
}
```

### Node.js Application

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2020",
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["dist"]
}
```

## 🔍 Type Checking Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "typecheck:watch": "tsc --noEmit --watch",
    "build:types": "tsc --emitDeclarationOnly",
    "clean:types": "rm -rf dist types"
  }
}
```

## 🛠️ IDE Integration

### VS Code

Add to your `.vscode/settings.json`:

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

### WebStorm/IntelliJ

The configuration works out of the box with WebStorm's TypeScript integration.

## 🚀 Performance Tips

1. **Use Project References**: For large monorepos, consider TypeScript project references
2. **Incremental Compilation**: The configuration enables incremental builds by default
3. **Skip Lib Check**: `skipLibCheck` is enabled for faster compilation
4. **Cache Build Info**: Build information is cached in `node_modules/.cache/`

## 🔗 Compatibility

- **TypeScript**: 5.0+
- **Node.js**: 18.0+
- **Vue**: 3.0+
- **Vite**: 4.0+
- **Build Tools**: Supports all modern bundlers

## 🤝 Contributing

This configuration is part of the Vue Card Stack monorepo. Contributions should be made to the main repository.

## 📄 License

MIT License - see the main repository for details.

---

**Made with ❤️ by ReactivePixels** 