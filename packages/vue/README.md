# Vue Card Stack

A Vue 3 component for creating smooth, draggable card stacks with full TypeScript support and custom card properties.

## Features

- 🎯 **Strongly Typed**: Full TypeScript support with generic card types
- 🎨 **Fully Customizable**: Custom card rendering with slot support
- 📱 **Touch & Mouse Support**: Works on desktop and mobile devices
- ⚡ **Performance Optimized**: Smooth animations and efficient rendering
- 🎛️ **Configurable**: Extensive configuration options

## Quick Start

### Installation

```bash
npm install @card-stack/vue
```

### Basic Usage

For basic usage with default card properties:

```vue
<template>
  <VueCardStack :cards="cards">
    <template #card="{ card }">
      <div>Card {{ card._index }}</div>
    </template>
  </VueCardStack>
</template>

<script setup lang="ts">
import { VueCardStack, type BaseCardData } from "@card-stack/vue";

const cards = ref<BaseCardData[]>([{ _id: 1 }, { _id: 2 }, { _id: 3 }]);
</script>
```

### Strongly Typed Custom Cards

For custom card properties with full type safety:

```vue
<template>
  <VueCardStack :cards="cards">
    <template #card="{ card }">
      <div class="custom-card" :style="{ backgroundColor: card.color }">
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
        <!-- Full type safety - TypeScript knows about card.color, card.title, etc. -->
      </div>
    </template>
  </VueCardStack>
</template>

<script setup lang="ts">
import { createVueCardStack, type BaseCardData } from "@card-stack/vue";

// Define your custom card type
interface MyCardData extends BaseCardData {
  title: string;
  description: string;
  color: string;
  tags?: string[];
}

// Create a strongly typed component
const VueCardStack = createVueCardStack<MyCardData>();

const cards = ref<MyCardData[]>([
  {
    title: "Card 1",
    description: "This is the first card",
    color: "#ff6b6b",
    tags: ["vue", "typescript"],
  },
  {
    title: "Card 2",
    description: "This is the second card",
    color: "#4ecdc4",
    tags: ["javascript", "web"],
  },
]);
</script>
```

## API Reference

### Props

| Prop                | Type                       | Default | Description                                     |
| ------------------- | -------------------------- | ------- | ----------------------------------------------- |
| `cards`             | `T[]`                      | `[]`    | Array of card data objects                      |
| `cardWidth`         | `number`                   | `300`   | Width of individual cards in pixels             |
| `cardHeight`        | `number`                   | `400`   | Height of individual cards in pixels            |
| `stackWidth`        | `number \| string \| null` | `null`  | Width of the stack container                    |
| `sensitivity`       | `number`                   | `0.25`  | Drag sensitivity (0-1, higher = more sensitive) |
| `maxVisibleCards`   | `number`                   | `10`    | Maximum number of visible cards in the stack    |
| `scaleMultiplier`   | `number`                   | `0.5`   | Scale multiplier for card sizing effect         |
| `speed`             | `number`                   | `0.2`   | Animation speed in seconds                      |
| `paddingHorizontal` | `number`                   | `20`    | Horizontal padding around the stack             |
| `paddingVertical`   | `number`                   | `20`    | Vertical padding around the stack               |

### Events

| Event  | Payload  | Description                           |
| ------ | -------- | ------------------------------------- |
| `move` | `number` | Emitted during card movement/dragging |

### Slots

#### Card Slot

The `card` slot receives the following props:

```typescript
{
  card: YourCardType & {
    // Internal positioning properties
    _id: number
    _index: number
    xPos: number
    yPos: number
    scale: number
    opacity: number
    display: string
    zIndex: number
    width: number
    height: number
    isDragging: boolean
    $index: number
  }
}
```

#### Navigation Slot

The `nav` slot receives the following props:

```typescript
{
  activeCardIndex: number
  onNext: () => void
  onPrevious: () => void
}
```

## Type Definitions

### BaseCardData

All card types must extend `BaseCardData`:

```typescript
interface BaseCardData {
  _id?: number;
  _index?: number;
}
```

### Creating Custom Card Types

```typescript
import type { BaseCardData } from "@card-stack/vue";

interface MyCardData extends BaseCardData {
  title: string;
  image: string;
  category: "tech" | "design" | "business";
  featured?: boolean;
}
```

### Using the Generic Component

```typescript
import { createVueCardStack } from "@card-stack/vue";

// Create a typed component instance
const VueCardStack = createVueCardStack<MyCardData>();
```

## Advanced Usage

### Custom Navigation

```vue
<template #nav="{ activeCardIndex, onNext, onPrevious }">
  <div class="custom-nav">
    <button @click="onPrevious" :disabled="activeCardIndex === 0">
      Previous
    </button>
    <span>{{ activeCardIndex + 1 }} / {{ cards.length }}</span>
    <button @click="onNext" :disabled="activeCardIndex === cards.length - 1">
      Next
    </button>
  </div>
</template>
```

### Handling Card Interactions

```vue
<template #card="{ card }">
  <div
    @click="handleCardClick(card)"
    @mouseenter="handleCardHover(card)"
    class="interactive-card"
  >
    <!-- Your card content -->
  </div>
</template>

<script setup lang="ts">
const handleCardClick = (card: MyCardData) => {
  console.log("Card clicked:", card.title);
};

const handleCardHover = (card: MyCardData) => {
  console.log("Card hovered:", card.title);
};
</script>
```

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

MIT License - see LICENSE file for details.
