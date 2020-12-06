---
sidebar: auto
---

# Vue Card Stack

> Stackable, swipeable, tweakable Vue card component.

## Getting Started

### Installation

```bash
npm install vue-card-stack

or

yarn add vue-card-stack
```

## Examples

### Basic

<BasicDemo />

```js
import Vue from "vue";
import VueCardStack from "vue-card-stack";

export default {
  components: {
    VueCardStack,
  },
  data() {
    return {
      cards: [
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" },
      ],
    };
  },
};
```

```html
<vue-card-stack :cards="cards" :stack-width="360" :card-width="280">
  <template v-slot:card="{ card }">
    <div
      style="width: 100%; height: 100%;"
      :style="{ background: card.background }"
    ></div>
  </template>
</vue-card-stack>
```

### With Navigation

<WithNavigation />

```html
<vue-card-stack :cards="cards" :stack-width="360" :card-width="280">
  <template v-slot:card="{ card }">
    <div
      style="width: 100%; height: 100%;"
      :style="{ background: card.background }"
    ></div>
  </template>

  <template v-slot:nav="{ activeCardIndex, onNext, onPrevious }">
    <nav class="nav">
      <div class="counter">{{activeCardIndex + 1}}/{{cards.length}}</div>
      <button v-on:click="onPrevious" class="button">
        <span class="chevron left"></span>
      </button>
      <button v-on:click="onNext" class="button">
        <span class="chevron right"></span>
      </button>
    </nav>
  </template>
</vue-card-stack>
```

### Interactive

<InteractiveDemo />

## API

### Props

| Name                  | Type            |             Default             | Description                                                                                        |
| :-------------------- | :-------------- | :-----------------------------: | :------------------------------------------------------------------------------------------------- |
| **cards**             | `Array`         |              `[]`               | Array of cards to render stack.                                                                    |
| **cardWidth**         | `Number`        |              `300`              | Width of card in pixels.                                                                           |
| **cardHeight**        | `Number`        |              `400`              | Height of card in pixels.                                                                          |
| **stackWidth**        | `Number|String` | `cardWidth + paddingHorizontal` | Width of card stack in pixels or as a percentage (responsive).                                     |
| **sensitivity**       | `Number`        |             `0.25`              | Distance card must travel as percentage of `cardWidth` + `paddingHorizontal`.                      |
| **maxVisibleCards**   | `Number`        |              `10`               | Number of cards that will be visible at any one time.                                              |
| **scaleMultiplier**   | `Number`        |             `0.75`              | A number between `0` and `1` that determines how much a card scales as it moved through the stack. |
| **speed**             | `Number`        |              `0.2`              | Duration in milliseconds for card swipe transition.                                                |
| **paddingHorizontal** | `Number`        |              `20`               | A gutter size in pixels that will be applied to left and right hand side of card stack.            |
| **paddingVertical**   | `Number`        |              `20`               | A gutter size in pixels that will be applied to top and bottom of card stack.                      |

::: tip
To help get you up and running quickly, most props are optional. To get started, simply provide an `Array` of cards to the component.
:::

### Events

| Name     | Attributes | Listen to | Description                                                                                                                                                                                              |
| :------- | :--------- | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **move** | `(value)`  |  `@move`  | Emitted as card position changes. Value represents distance card has moved as a value between `0` and `1` values below `0` and above `1` are returned if card is moved beyond `min` and `max` distances. |

### Slots

| Name     | Description                                                                                                                                                                                                                        |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **card** | Slot for individual card in stack.                                                                                                                                                                                                 |
| **nav**  | Slot for controlling navigation of card stack.<ul><li>`activeCardIndex` - returrns current card index.</li><li>`onNext` - method to move forwards though stack.<li>`onPrevious` - method to move backwards though stack.</li></ul> |
