---
sidebar: auto
---

# Vue Card Stack

> Stackable, swipeable, tweakable Vue card component.

## Introduction

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia vel assumenda facilis culpa cumque dolor labore reiciendis mollitia doloremque, laudantium, voluptas corrupti aspernatur. Pariatur quod, voluptatibus adipisci ex et nihil!

## Getting Started

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia vel assumenda facilis culpa cumque dolor labore reiciendis mollitia doloremque, laudantium, voluptas corrupti aspernatur. Pariatur quod, voluptatibus adipisci ex et nihil!

## Examples

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia vel assumenda facilis culpa cumque dolor labore reiciendis mollitia doloremque, laudantium, voluptas corrupti aspernatur. Pariatur quod, voluptatibus adipisci ex et nihil!

### Basic

<BasicDemo />

```js
import Vue from 'vue'
import VueCardStack from 'vue-card-stack'

export default {
  components: {
    VueCardStack
  },
  data() {
    return {
      cards: [
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" }
      ]
    }
  }
}
```

```html
<vue-card-stack :cards="cards" :stack-width="360" :card-width="280">
  <template v-slot:card="{ card }">
    <div 
      style="width: 100%; height: 100%;"
      :style="{ background: card.background }"
    >
    </div>
  </template>
</vue-card-stack>
```

## API

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Props

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Events

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Slots

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |