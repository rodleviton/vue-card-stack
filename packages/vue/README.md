# Vue Card Stack

<div align="center">

![Vue Card Stack Demo](https://raw.githubusercontent.com/your-username/vue-card-stack/main/demo.gif)

**A performant, accessible card stack component for Vue 3 with drag-to-swipe functionality**

[![npm version](https://badge.fury.io/js/vue-card-stack.svg)](https://badge.fury.io/js/vue-card-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://your-demo-link.com) | [Documentation](https://your-docs-link.com) | [Examples](https://github.com/your-username/vue-card-stack/tree/main/examples)

</div>

## ✨ Features

- 🎯 **Strongly Typed**: Full TypeScript support with generic card types and comprehensive IntelliSense
- 🎨 **Fully Customizable**: Custom card rendering with flexible slot system
- 📱 **Touch & Mouse Support**: Seamless interaction on desktop and mobile devices
- ⚡ **Performance Optimized**: Hardware-accelerated animations and efficient rendering
- ♿ **Accessible**: ARIA attributes, screen reader support, and keyboard navigation
- 🎛️ **Highly Configurable**: Extensive configuration options for every use case
- 📦 **Tree Shakeable**: Import only what you need
- 🔄 **SSR Compatible**: Works with server-side rendering out of the box

## 🚀 Quick Start

### Installation

```bash
# npm
npm install vue-card-stack

# yarn
yarn add vue-card-stack

# pnpm
pnpm add vue-card-stack
```

### Basic Usage

```vue
<template>
  <VueCardStack :cards="cards" @move="handleMove">
    <template #card="{ card }">
      <div class="card">
        <h3>{{ card.data.title }}</h3>
        <p>Card {{ card.$index + 1 }}</p>
      </div>
    </template>
  </VueCardStack>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type BaseCardData, VueCardStack } from 'vue-card-stack'

interface SimpleCard extends BaseCardData {
  title: string
}

const cards = ref<SimpleCard[]>([
  { title: 'First Card' },
  { title: 'Second Card' },
  { title: 'Third Card' }
])

const handleMove = (value: number) => {
  console.log('Card movement:', value)
}
</script>

<style scoped>
.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
```

### Plugin Installation (Global Registration)

```ts
// main.ts
import App from './App.vue'
import { createApp } from 'vue'
import { VueCardStackPlugin } from 'vue-card-stack'

const app = createApp(App)

// Install with default options
app.use(VueCardStackPlugin)

// Or with custom options
app.use(VueCardStackPlugin, {
  componentName: 'CardStack', // Use <CardStack> instead of <VueCardStack>
  globalRegistration: true
})

app.mount('#app')
```

## 🎨 Type-Safe Custom Cards

For complete type safety with custom card properties:

```vue
<template>
  <VueCardStack
    :cards="products"
    :card-width="320"
    :card-height="480"
    :max-visible-cards="5"
    @move="handleCardMove"
  >
    <template #card="{ card }">
      <div
        class="product-card"
        :class="{ featured: card.data.featured, dragging: card.isDragging }"
      >
        <img :src="card.data.image" :alt="card.data.name" />
        <div class="content">
          <h3>{{ card.data.name }}</h3>
          <p class="price">${{ card.data.price.toFixed(2) }}</p>
          <div class="tags">
            <span v-for="tag in card.data.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
          <p class="stock" :class="{ 'out-of-stock': !card.data.inStock }">
            {{ card.data.inStock ? 'In Stock' : 'Out of Stock' }}
          </p>
        </div>
      </div>
    </template>

    <template #nav="{ activeCardIndex, totalCards, onNext, onPrevious, isDragging }">
      <div class="navigation">
        <button @click="onPrevious" :disabled="isDragging" class="nav-btn prev">← Previous</button>
        <span class="counter">{{ activeCardIndex + 1 }} / {{ totalCards }}</span>
        <button @click="onNext" :disabled="isDragging" class="nav-btn next">Next →</button>
      </div>
    </template>
  </VueCardStack>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type BaseCardData, createVueCardStack } from 'vue-card-stack'

// Define your custom card interface
interface ProductCard extends BaseCardData {
  name: string
  price: number
  image: string
  inStock: boolean
  featured?: boolean
  tags: string[]
  category: 'electronics' | 'clothing' | 'books' | 'home'
}

// Create a strongly typed component instance
const VueCardStack = createVueCardStack<ProductCard>()

const products = ref<ProductCard[]>([
  {
    name: 'Wireless Headphones',
    price: 199.99,
    image: '/images/headphones.jpg',
    inStock: true,
    featured: true,
    tags: ['wireless', 'audio', 'premium'],
    category: 'electronics'
  },
  {
    name: 'Vintage T-Shirt',
    price: 29.99,
    image: '/images/tshirt.jpg',
    inStock: false,
    tags: ['vintage', 'cotton', 'casual'],
    category: 'clothing'
  }
  // ... more products
])

const handleCardMove = (value: number) => {
  // value ranges from -1 to 1 during drag
  // 0 when not dragging
  console.log('Card movement progress:', value)
}
</script>
```

## 📚 API Reference

### Component Props

| Prop                | Type                       | Default | Description                                                             |
| ------------------- | -------------------------- | ------- | ----------------------------------------------------------------------- |
| `cards`             | `T[]`                      | `[]`    | **Required.** Array of card data objects                                |
| `cardWidth`         | `number`                   | `300`   | Width of individual cards in pixels                                     |
| `cardHeight`        | `number`                   | `400`   | Height of individual cards in pixels                                    |
| `stackWidth`        | `number \| string \| null` | `null`  | Container width. `null` = auto, `number` = pixels, `string` = CSS value |
| `sensitivity`       | `number`                   | `0.25`  | Drag sensitivity (0-1). Higher = more sensitive                         |
| `maxVisibleCards`   | `number`                   | `10`    | Maximum visible cards in stack                                          |
| `scaleMultiplier`   | `number`                   | `0.5`   | Scale effect intensity (0-1)                                            |
| `speed`             | `number`                   | `0.2`   | Animation duration in seconds                                           |
| `paddingHorizontal` | `number`                   | `20`    | Horizontal padding in pixels                                            |
| `paddingVertical`   | `number`                   | `20`    | Vertical padding in pixels                                              |

### Events

| Event  | Type                      | Description                                                                |
| ------ | ------------------------- | -------------------------------------------------------------------------- |
| `move` | `(value: number) => void` | Emitted during drag. Value: `-1` to `1` during drag, `0` when not dragging |

### Slots

#### Card Slot

**Slot name:** `card`

**Props:**

```typescript
{
  card: InternalCard & {
    $index: number              // Current position in stack (0-based)
    data: Omit<T, '_id' | '_index'>  // Your custom card data

    // Internal properties (for advanced usage)
    _id: number                 // Unique identifier
    _index: number              // Original array index
    xPos: number               // X position in pixels
    yPos: number               // Y position in pixels
    scale: number              // Scale factor (0-1)
    opacity: number            // Opacity (0-1)
    zIndex: number             // Stacking order
    isDragging: boolean        // Whether currently being dragged
    // ... other internal properties
  }
}
```

#### Navigation Slot

**Slot name:** `nav`

**Props:**

```typescript
{
  activeCardIndex: number      // Current active card (0-based)
  totalCards: number          // Total number of cards
  onNext: () => void          // Move to next card
  onPrevious: () => void      // Move to previous card
  isDragging: boolean         // Whether drag is in progress
}
```

## 🔧 Configuration Examples

### Responsive Stack Width

```vue
<template>
  <!-- Auto width based on card size -->
  <VueCardStack :cards="cards" :stack-width="null" />

  <!-- Fixed pixel width -->
  <VueCardStack :cards="cards" :stack-width="600" />

  <!-- Responsive CSS width -->
  <VueCardStack :cards="cards" stack-width="100%" />
  <VueCardStack :cards="cards" stack-width="50vw" />
</template>
```

### Sensitivity and Performance

```vue
<template>
  <!-- High sensitivity for quick swipes -->
  <VueCardStack :cards="cards" :sensitivity="0.8" />

  <!-- Low sensitivity for precise control -->
  <VueCardStack :cards="cards" :sensitivity="0.1" />

  <!-- Fast animations -->
  <VueCardStack :cards="cards" :speed="0.1" />

  <!-- Smooth, slower animations -->
  <VueCardStack :cards="cards" :speed="0.5" />
</template>
```

### Visual Effects

```vue
<template>
  <!-- Subtle scale effect -->
  <VueCardStack :cards="cards" :scale-multiplier="0.2" />

  <!-- Dramatic scale effect -->
  <VueCardStack :cards="cards" :scale-multiplier="0.8" />

  <!-- Show fewer cards for cleaner look -->
  <VueCardStack :cards="cards" :max-visible-cards="3" />

  <!-- Compact layout -->
  <VueCardStack :cards="cards" :padding-horizontal="10" :padding-vertical="10" />
</template>
```

## 🎯 Advanced Usage

### Programmatic Control

```vue
<template>
  <VueCardStack ref="stackRef" :cards="cards">
    <template #card="{ card }">
      <!-- Card content -->
    </template>
  </VueCardStack>

  <div class="controls">
    <button @click="goNext">Next Card</button>
    <button @click="goPrevious">Previous Card</button>
    <button @click="getCurrentIndex">Get Current</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type VueCardStackInstance } from 'vue-card-stack'

const stackRef = ref<VueCardStackInstance>()

const goNext = () => {
  stackRef.value?.onNext()
}

const goPrevious = () => {
  stackRef.value?.onPrevious()
}

const getCurrentIndex = () => {
  console.log('Current index:', stackRef.value?.getActiveCardIndex())
}
</script>
```

### Dynamic Card Management

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const allCards = ref([...]) // Your complete card dataset
const currentPage = ref(0)
const cardsPerPage = 10

// Paginated cards for performance
const visibleCards = computed(() => {
  const start = currentPage.value * cardsPerPage
  return allCards.value.slice(start, start + cardsPerPage)
})

const loadMoreCards = () => {
  if ((currentPage.value + 1) * cardsPerPage < allCards.value.length) {
    currentPage.value++
  }
}
</script>
```

### Custom Animations

```vue
<style scoped>
/* Custom card transitions */
.vue-card-stack .card-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom hover effects */
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Loading states */
.card.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
```

## 🔍 Type Definitions

### BaseCardData Interface

All card types must extend `BaseCardData`:

```typescript
interface BaseCardData {
  _id?: number // Auto-generated unique identifier
  _index?: number // Auto-generated original index
}
```

### Creating Type-Safe Components

```typescript
import { type BaseCardData, createVueCardStack } from 'vue-card-stack'

// Define your card interface
interface BlogPost extends BaseCardData {
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: Date
  tags: string[]
  readTime: number
  featured?: boolean
}

// Create typed component
const BlogCardStack = createVueCardStack<BlogPost>()

// Now you have full type safety:
// - Props are properly typed
// - Slot props include your custom data
// - IntelliSense works perfectly
```

### Utility Types

```typescript
import type {
  ExtractCardSlotProps,
  ExtractCardType,
  VueCardStackProps,
  VueCardStackSlots
} from 'vue-card-stack'

// Extract card type from component
type MyCardType = ExtractCardType<typeof BlogCardStack> // BlogPost

// Get slot prop types
type CardProps = ExtractCardSlotProps<BlogPost>
```

## 🔧 Composables

For advanced use cases, you can use the underlying composables directly:

```typescript
import { useCardStack, useDragHandling, useStackCalculations } from 'vue-card-stack'

// Build custom implementations
// See source code for detailed usage
```

## 🎨 Styling Guide

### CSS Classes

The component provides these CSS classes for styling:

```css
.vue-card-stack {
  /* Main container */
}

.vue-card-stack .card-container {
  /* Individual card containers */
}

.vue-card-stack .card-container.dragging {
  /* Cards being dragged */
}

.vue-card-stack .card-container.active {
  /* Currently active card */
}
```

### Custom Themes

```vue
<style scoped>
/* Dark theme */
.vue-card-stack.dark {
  --card-background: #2d3748;
  --card-text: #e2e8f0;
  --card-shadow: rgba(0, 0, 0, 0.4);
}

/* Glassmorphism theme */
.card.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
```

## 🌐 Browser Support

- **Modern Browsers**: Chrome 84+, Firefox 78+, Safari 14+, Edge 84+
- **Mobile**: iOS Safari 14+, Android Chrome 84+
- **Features**:
  - Touch events (mobile/tablet)
  - Mouse events (desktop)
  - Keyboard navigation (accessibility)
  - Reduced motion support

## 📦 Bundle Size

- **Minified**: ~15KB
- **Gzipped**: ~5KB
- **Tree-shakeable**: Import only what you need

## 🔧 Troubleshooting

### Common Issues

**Cards not showing:**

```typescript
// Ensure cards array is not empty and properly typed
const cards = ref<YourCardType[]>([...])
```

**TypeScript errors:**

```typescript
// Make sure your card interface extends BaseCardData
interface MyCard extends BaseCardData {
  // your properties
}
```

**Performance issues:**

```vue
<!-- Limit visible cards for large datasets -->
<VueCardStack :cards="cards" :max-visible-cards="5" />
```

**SSR hydration mismatch:**

```vue
<!-- Wrap in ClientOnly for Nuxt -->
<ClientOnly>
  <VueCardStack :cards="cards" />
</ClientOnly>
```

### Debug Mode

```typescript
// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  console.log('Card stack debug info:', stackRef.value?.getDebugInfo?.())
}
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/vue-card-stack.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## 🎯 Roadmap

- [ ] Animation presets and easing functions
- [ ] Virtual scrolling for massive datasets
- [ ] Gesture customization (pinch, rotate)
- [ ] React and Svelte versions
- [ ] Visual card builder/editor
- [ ] More pre-built card templates

## 💖 Support

If this project helped you, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation
- ☕ [Buying us a coffee](https://buymeacoffee.com/your-username)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/ReactivePixels">ReactivePixels</a>
</div>
