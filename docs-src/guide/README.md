---
sidebar: auto
---

# Vue Card Stack

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia vel assumenda facilis culpa cumque dolor labore reiciendis mollitia doloremque, laudantium, voluptas corrupti aspernatur. Pariatur quod, voluptatibus adipisci ex et nihil!

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
<vue-card-stack :cards="cards" stack-width="100%">
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

### Props

### Events

### Slots