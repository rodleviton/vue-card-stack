# vue-card-stack

![CI](https://github.com/rodleviton/vue-card-stack/workflows/CI/badge.svg)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/rodleviton/vue-card-stack/blob/master/LICENCE)


## Install

```bash
npm install vue-card-stack

or

yarn add vue-card-stack
```

## Usage

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
<vue-card-stack :cards="cards">
  <template v-slot:card="{ card }">
    <div :style="{ background: card.background }" style="width: 100%; height: 100%;"></div>
  </template>
</vue-card-stack>
```

# License

MIT
