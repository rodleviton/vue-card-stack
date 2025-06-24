# Vue Card Stack

A Vue 3 component for creating beautiful, interactive card stacks with smooth animations and touch/mouse interactions.

## Features

- 🎨 Smooth animations and transitions
- 📱 Touch and mouse interaction support
- 🔄 Next/Previous navigation
- 📏 Configurable card sizing and spacing
- 🎯 Customizable sensitivity and animations
- 🎭 Flexible slot system for custom card content
- 💪 Written in TypeScript with full type support
- 🔧 Vue 3 Composition API

## Installation

```bash
npm install @card-stack/vue
```

## Usage

```vue
<script setup lang="ts">
import { VueCardStack } from "@card-stack/vue";
import "@card-stack/vue/dist/style.css";

const cards = [
  { background: "#00659d" },
  { background: "#00abbc" },
  { background: "#e2c58a" },
  // ... more cards
];
</script>

<template>
  <vue-card-stack
    :cards="cards"
    :stack-width="460"
    :card-width="300"
    :card-height="460"
    @move="(value) => console.log('Moving:', value)"
  >
    <!-- Card slot for custom content -->
    <template #card="{ card }">
      <div class="card" :style="{ background: card.background }">
        <!-- Your card content here -->
      </div>
    </template>

    <!-- Optional navigation slot -->
    <template #nav="{ activeCardIndex, onNext, onPrevious }">
      <nav>
        <button @click="onPrevious">Previous</button>
        <span>{{ activeCardIndex + 1 }}/{{ cards.length }}</span>
        <button @click="onNext">Next</button>
      </nav>
    </template>
  </vue-card-stack>
</template>
```

## Props

| Prop                | Type                       | Default  | Description                     |
| ------------------- | -------------------------- | -------- | ------------------------------- |
| `cards`             | `any[]`                    | Required | Array of card data objects      |
| `cardWidth`         | `number`                   | `300`    | Width of each card in pixels    |
| `cardHeight`        | `number`                   | `400`    | Height of each card in pixels   |
| `stackWidth`        | `number \| string \| null` | `null`   | Width of the stack container    |
| `sensitivity`       | `number`                   | `0.25`   | Drag sensitivity (0-1)          |
| `maxVisibleCards`   | `number`                   | `10`     | Maximum number of visible cards |
| `scaleMultiplier`   | `number`                   | `0.5`    | Scale factor for stacked cards  |
| `speed`             | `number`                   | `0.2`    | Animation speed in seconds      |
| `paddingHorizontal` | `number`                   | `20`     | Horizontal padding in pixels    |
| `paddingVertical`   | `number`                   | `20`     | Vertical padding in pixels      |

## Events

| Event  | Payload  | Description                                            |
| ------ | -------- | ------------------------------------------------------ |
| `move` | `number` | Emitted during card movement with progress value (0-1) |

## Slots

### Card Slot (`#card`)

Slot for customizing individual card content.

#### Props

- `card`: The card data object with additional internal properties
- `$index`: Current index in the stack

### Navigation Slot (`#nav`)

Slot for customizing navigation controls.

#### Props

- `activeCardIndex`: Current active card index
- `onNext`: Function to move to next card
- `onPrevious`: Function to move to previous card

## TypeScript Support

The component includes full TypeScript support. You can specify the type of your card data:

```typescript
interface MyCard {
  background: string;
  title?: string;
  // ... other card properties
}

const cards = ref<MyCard[]>([
  { background: "#00659d", title: "Card 1" },
  // ... more cards
]);
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with touch support
- IE11 not supported

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT
