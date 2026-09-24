# vue-card-stack is retired: use Riffle

`vue-card-stack` has been retired in favor of **[Riffle](https://reactivepixels.github.io/riffle)**,
its framework-agnostic successor. Riffle keeps the same card-and-slot shape you know from
`vue-card-stack`, adds a real vanilla core so it isn't tied to one framework, ships a Vue
adapter that mirrors this component's API, and adds a React adapter alongside it. New
features, fixes and releases will land there, not here.

- **Docs, API reference and live demo:** https://reactivepixels.github.io/riffle
- **Migrating from vue-card-stack:** https://reactivepixels.github.io/riffle/migration/
  (every prop mapped, with a worked before/after)

```bash
npm install @rpxl/riffle-vue
```

---

<p align="center">
  <a href="https://github.com/rodleviton/vue-card-stack/" target="_blank">
    <img width="300" alt="Vue Card Stack Logo" src="https://github.com/rodleviton/vue-card-stack/blob/master/vue-card-stack.png">
  </a>
</p>

# vue-card-stack

![CI](https://github.com/rodleviton/vue-card-stack/workflows/CI/badge.svg)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/rodleviton/vue-card-stack/blob/master/LICENSE)
[![Mentioned in Awesome Awesome Vue](https://awesome.re/mentioned-badge.svg)](https://github.com/vuejs/awesome-vue)

> ## 🚨 Legacy: unmaintained
>
> The API docs below are kept for existing users of the published `vue-card-stack`
> package. This project is no longer actively maintained: no new pull requests, issues
> or releases. See [above](#vue-card-stack-is-retired-use-riffle) for the maintained
> replacement.

## Install

```bash
npm install vue-card-stack

or

yarn add vue-card-stack
```

## Usage

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
<vue-card-stack :cards="cards">
  <template v-slot:card="{ card }">
    <div
      :style="{ background: card.background }"
      style="width: 100%; height: 100%;"
    ></div>
  </template>
</vue-card-stack>
```

## API

### Props

| Name                  | Type              |             Default             | Description                                                                                        |
| :-------------------- | :---------------- | :-----------------------------: | :------------------------------------------------------------------------------------------------- |
| **cards**             | `Array`           |              `[]`               | Array of cards to render stack.                                                                    |
| **cardWidth**         | `Number`          |              `300`              | Width of card in pixels.                                                                           |
| **cardHeight**        | `Number`          |              `400`              | Height of card in pixels.                                                                          |
| **stackWidth**        | `[Number:String]` | `cardWidth + paddingHorizontal` | Width of card stack in pixels or as a percentage (responsive).                                     |
| **sensitivity**       | `Number`          |             `0.25`              | Distance card must travel as percentage of `cardWidth` + `paddingHorizontal`.                      |
| **maxVisibleCards**   | `Number`          |              `10`               | Number of cards that will be visible at any one time.                                              |
| **scaleMultiplier**   | `Number`          |              `0.5`              | A number between `0` and `1` that determines how much a card scales as it moved through the stack. |
| **speed**             | `Number`          |              `0.2`              | Duration in milliseconds for card swipe transition.                                                |
| **paddingHorizontal** | `Number`          |              `20`               | A gutter size in pixels that will be applied to left and right hand side of card stack.            |
| **paddingVertical**   | `Number`          |              `20`               | A gutter size in pixels that will be applied to top and bottom of card stack.                      |

> To help get you up and running quickly, most props are optional. To get started, simply provide an `Array` of cards to the component.

### Events

| Name     | Attributes | Listen to | Description                                                                                                                                                                                              |
| :------- | :--------- | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **move** | `(value)`  |  `@move`  | Emitted as card position changes. Value represents distance card has moved as a value between `0` and `1` values below `0` and above `1` are returned if card is moved beyond `min` and `max` distances. |

### Slots

| Name     | Description                                                                                                                                                                                                                        |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **card** | Slot for individual card in stack.                                                                                                                                                                                                 |
| **nav**  | Slot for controlling navigation of card stack.<ul><li>`activeCardIndex` - returrns current card index.</li><li>`onNext` - method to move forwards though stack.<li>`onPrevious` - method to move backwards though stack.</li></ul> |

## Docs

See the full api docs and examples here: https://rodleviton.github.io/vue-card-stack/

## Examples

https://www.rodleviton.com/pixels/vue-card-stack

## License

MIT
