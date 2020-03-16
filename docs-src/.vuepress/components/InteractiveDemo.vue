<template>
  <div style="width: 100%; display: flex; align-items: center; flex-direction: column;">
    <VueCardStack
      :cards="cards"
      :card-width="300"
      :card-height="460"
      :stack-width="stackWidth"
      :max-visible-cards="parseInt(maxVisibleCards)"
      :scale-multiplier="parseFloat(scaleMultiplier)"
      ref="stack"
    >
      <template v-slot:card="{ card }">
        <div class="card" :style="{ background: card.background }"></div>
      </template>
    </VueCardStack>
    <div class="controls">
      <div class="slide__container">
        <label>maxVisibleCards: <span>{{ maxVisibleCards }}</span></label>
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
        <label>stackWidth: <span>{{ stackWidth }}</span></label>
        <input
          type="range"
          min="330"
          max="1600"
          class="slider"
          v-model="stackWidth"
        />
      </div>
      <div class="slide__container">
        <label>scaleMultiplier: <span>{{ scaleMultiplier }}</span></label>
        <input
          style="width: 100px; height 40px;"
          type="number"
          step="0.05" min="0" max="1"
          v-model="scaleMultiplier"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueCardStack from "../../../src/vue-card-stack";
import { debounce } from "../../../src/utils/debounce";

export default Vue.extend({
  name: "InteractiveDemo",
  components: {
    VueCardStack
  },
  data() {
    return {
      maxVisibleCards: 6,
      containerWidth: 460,
      scaleMultiplier: 0.5,
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
        { background: "#b35d7f" },
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" },
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" },
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" },
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" },
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
    }
  }
});
</script>

<style scoped>
.card {
  height: 100%;
  border-radius: 8px;
}

.controls {
  width: 320px;
  margin-top: 20px;
}

.slide__container {
  margin-bottom: 20px;
}

.slide__container label {
  font-weight: 400;
  display: block;
}

.slide__container label span {
  font-weight: 600;
}

input[type=number], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=range] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  transition: 0.2s;
  background: #3eaf7c;
  border-radius: 1.3px;
}

input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #ccc;
  border: 1px solid #eee;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #3eaf7c;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3eaf7c;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  transition: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

input[type=range]::-ms-fill-lower {
  background: #3eaf7c;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type=range]::-ms-fill-upper {
  background: #3eaf7c;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]:focus::-ms-fill-lower {
  background: #3eaf7c;
}

input[type=range]:focus::-ms-fill-upper {
  background: #3eaf7c;
}
</style>