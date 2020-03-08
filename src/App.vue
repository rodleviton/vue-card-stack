<template>
  <div>
    <div class="slide__container">
      maxVisibleCards: {{ maxVisibleCards }}
      <input
        type="range"
        min="4"
        max="30"
        value="6"
        class="slider"
        v-model="maxVisibleCards"
      />
    </div>
    <div class="slide__container">
      stackWidth: {{ stackWidth }}
      <input
        type="range"
        min="330"
        max="1600"
        class="slider"
        v-model="stackWidth"
      />
    </div>
    <div class="slide__container">
      scaleMultiplier: {{ scaleMultiplier }}
      <input
        style="width: 100px; height 40px;"
        type="text"
        class="slider"
        v-model="scaleMultiplier"
      />
    </div>
    <div class="card-stack-wrapper" :style="{ width: `${stackWidth}px` }">
      <VueCardStack
        :cards="cards"
        :cardWidth="287"
        :maxVisibleCards="parseInt(maxVisibleCards)"
        :scaleMultiplier="parseFloat(scaleMultiplier)"
        class="card-stack"
        ref="stack"
      >
        <template v-slot:card="{ card }">
          <div
            class="card"
            :style="{
              boxShadow: cardShadows[card.$index]
            }"
          >
            <img :src="card.cover" draggable="false" />
          </div>
        </template>
      </VueCardStack>
    </div>
  </div>
</template>

<script>
import { VueCardStack } from "./components/VueCardStack";
import { debounce } from "./utils/debounce";
import data from "./data";

export default {
  name: "App",
  components: {
    VueCardStack
  },
  data() {
    return {
      maxVisibleCards: 12,
      containerWidth: 460,
      scaleMultiplier: 0.95
    };
  },
  computed: {
    cards() {
      return data;
    },
    stackWidth: {
      get() {
        return this.containerWidth;
      },
      set: debounce(function(val) {
        this.containerWidth = parseInt(val);
        this.$refs.stack.rebuild();
      }, 100)
    },
    cardShadows() {
      return this.cards.map((_, index) => {
        const y = 10 - 10 * index * (1 / this.maxVisibleCards);
        const x = 10 - 10 * index * (1 / this.maxVisibleCards);

        return `-1px ${x}px ${y}px 0px rgba(0, 0, 0, 0.05)`;
      });
    }
  }
};
</script>

<style lang="scss">
html {
  min-height: 100%;
}

body {
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style scoped lang="scss">
.card-stack-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 360px;
  height: 500px;
}

.card-stack {
  width: 100%;
  height: 460px;
  padding-bottom: 60px !important;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  overflow: hidden;
  color: #e3e3e3;
  font-size: 22px;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: -1px 10px 10px 0px rgba(0, 0, 0, 0.05);

  > img {
    width: 100%;
    user-select: none;
  }
}
</style>
