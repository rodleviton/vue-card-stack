# @card-stack/tsconfig

> Modern TypeScript configuration for the Card Stack monorepo with strict type safety and performance optimizations.

## Overview

This package provides a comprehensive TypeScript configuration that enforces strict type safety, modern language features, and performance optimizations while maintaining compatibility with Vue 3, modern bundlers, and monorepo workflows.

## Features

### 🛡️ **Strict Type Safety**

- Full strict mode enabled with enhanced checks
- Null safety with strict null checks
- Exact optional property types for better type accuracy
- Unchecked indexed access protection

### ⚡ **Performance Optimized**

- Incremental compilation with build info caching
- Optimized watch mode configuration
- Efficient module resolution with bundler mode
- Smart exclude patterns for faster compilation

### 🎯 **Modern Standards**

- ES2022 target with latest JavaScript features
- Vue 3 and JSX support out of the box
- Modern module system with ESNext modules
- Comprehensive library type definitions

## Configuration

### Core Settings

```json
{
  "target": "ES2022",
  "module": "ESNext",
  "moduleResolution": "bundler",
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```

### Key Features

#### Language & Environment

- **Target**: ES2022 for modern JavaScript features
- **Libraries**: DOM, ES2022, and async iterables
- **JSX**: Preserved for Vue 3 compatibility

#### Module System

- **Module**: ESNext for tree-shaking compatibility
- **Resolution**: Bundler mode for modern tooling
- **Imports**: Support for TypeScript file extensions

#### Type Checking

- **Strict Mode**: All strict checks enabled
- **Null Safety**: Comprehensive null/undefined checking
- **Index Safety**: Protected indexed access
- **Exact Types**: Precise optional property handling

## Usage

### Basic Setup

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

### Vue Project Setup

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "types": ["node", "@vue/runtime-core"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}
```

### Library Project Setup

```json
{
  "extends": "@card-stack/tsconfig/base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist"
  }
}
```

## Strict Mode Benefits

### Enhanced Type Safety

- **No Implicit Any**: Requires explicit typing
- **Strict Null Checks**: Prevents null/undefined errors
- **Strict Function Types**: Better function signature checking
- **No Implicit Returns**: Ensures all code paths return values

### Better Developer Experience

- **Exact Optional Properties**: More precise object typing
- **Unchecked Index Access**: Array/object access safety
- **Consistent Casing**: File system compatibility
- **Unknown in Catch**: Safer error handling

## Performance Features

### Incremental Compilation

```json
{
  "incremental": true,
  "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo.json"
}
```

### Optimized Watch Mode

```json
{
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",
    "excludeDirectories": ["**/node_modules", "**/.turbo"]
  }
}
```

### Smart Exclusions

- Node modules and dependencies
- Build and distribution directories
- Cache and temporary files
- IDE and OS specific files

## Vue 3 Integration

### JSX Configuration

```json
{
  "jsx": "preserve",
  "jsxFactory": "h",
  "jsxFragmentFactory": "Fragment",
  "jsxImportSource": "vue"
}
```

### Vue SFC Support

- Full TypeScript support in `<script setup>`
- Proper component prop typing
- Emit and slot type inference
- Composable function type safety

## Compatibility

### Bundlers

- **Vite**: Full compatibility with latest features
- **Webpack**: Modern loader compatibility
- **Rollup**: Tree-shaking and ESM support
- **esbuild**: Fast compilation support

### Frameworks

- **Vue 3**: Complete Composition API support
- **Node.js**: Modern Node.js API compatibility
- **Browser**: Latest browser API support

## Common Patterns

### Strict Type Definitions

```typescript
// Exact optional properties
interface UserConfig {
  name: string;
  age?: number; // Can be number or undefined, not null
}

// Safe indexed access
const getValue = (obj: Record<string, unknown>, key: string) => {
  return obj[key]; // TypeScript knows this could be undefined
};
```

### Vue Component Typing

```typescript
// Strong typing with script setup
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});
```

## Troubleshooting

### Common Issues

1. **Import Extensions**: Use `.js` extensions for TypeScript imports
2. **Strict Checks**: Address all strict mode warnings
3. **Index Access**: Handle potential undefined values
4. **Exact Properties**: Don't pass extra properties to strict interfaces

### Performance Tips

1. Use `skipLibCheck: true` for faster compilation
2. Exclude unnecessary directories
3. Enable incremental compilation
4. Use project references for monorepos

## Migration Guide

### From Older TypeScript

1. Update target to ES2022
2. Enable all strict checks gradually
3. Fix unchecked indexed access issues
4. Update JSX configuration for Vue 3

### Best Practices

1. Always use strict mode
2. Prefer type imports over value imports
3. Use exact optional property types
4. Handle undefined in indexed access

## License

MIT - See the main project license for details.
