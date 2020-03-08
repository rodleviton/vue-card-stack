<template>
  <div>
    <VueCardStack
      :cards="cards"
      :cardWidth="300"
      :cardHeight="460"
      :stackWidth="stackWidth"
      :maxVisibleCards="parseInt(maxVisibleCards)"
      :scaleMultiplier="parseFloat(scaleMultiplier)"
      ref="stack"
    >
      <template v-slot:card="{ card }">
        <div
          class="card"
          :style="{
              background: card.background,
              boxShadow: cardShadows[card.$index]
            }"
        ></div>
      </template>
    </VueCardStack>
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
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueCardStack from "@/vue-card-stack.vue";
import { debounce } from "@/utils/debounce";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueCardStack
  },
  data() {
    return {
      maxVisibleCards: 12,
      containerWidth: 460,
      scaleMultiplier: 0.95,
      cards: [
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" },
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" }
      ]
    };
  },
  computed: {
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
});
</script>

<style>
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

<style scoped>
.card {
  height: 100%;
  border-radius: 8px;
}
</style>