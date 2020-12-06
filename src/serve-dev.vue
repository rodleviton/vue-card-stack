<template>
  <div
    style="width: 100%; display: flex; align-items: center; flex-direction: column;"
  >
    <VueCardStack
      :cards="cards"
      :card-width="300"
      :card-height="460"
      :stack-width="stackWidth"
      :max-visible-cards="parseInt(maxVisibleCards)"
      :scale-multiplier="parseFloat(scaleMultiplier)"
      ref="stack"
    >
      <template v-slot:nav="{ activeCardIndex, onNext, onPrevious }">
        <nav class="nav">
          <div class="counter">
            {{ activeCardIndex + 1 }}/{{ cards.length }}
          </div>
          <button v-on:click="onPrevious" class="button">
            <span class="chevron left"></span>
          </button>
          <button v-on:click="onNext" class="button">
            <span class="chevron right"></span>
          </button>
        </nav>
      </template>

      <template v-slot:card="{ card }">
        <div class="card" :style="{ background: card.background }"></div>
      </template>
    </VueCardStack>
    <div class="controls">
      <div class="slide__container">
        <label
          >maxVisibleCards: <span>{{ maxVisibleCards }}</span></label
        >
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
        <label
          >stackWidth: <span>{{ stackWidth }}</span></label
        >
        <input
          type="range"
          min="330"
          max="1600"
          class="slider"
          v-model="stackWidth"
        />
      </div>
      <div class="slide__container">
        <label
          >scaleMultiplier: <span>{{ scaleMultiplier }}</span></label
        >
        <input
          style="width: 100px; height: 40px;"
          type="number"
          step="0.05"
          min="0"
          max="1"
          v-model="scaleMultiplier"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueCardStack from "@/vue-card-stack.vue";
// import VueCardStack from "vue-card-stack";
import { debounce } from "@/utils/debounce";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueCardStack,
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
      ],
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
      }, 100),
    },
  },
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
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 16px;
  color: #2c3e50;
}
</style>

<style scoped>
.card {
  height: 100%;
  border-radius: 8px;
}

.nav {
  display: flex;
  width: 100%;
  justify-content: center;
}

.nav .counter {
  font-weight: 600;
  font-size: 12px;
  background: #3eaf7c;
  padding: 4px;
  border-radius: 4px;
  color: white;
}

.nav .button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
  color: #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
}

.nav .button:first-of-type {
  left: 0;
}

.nav .button:last-of-type {
  right: 0;
}

.nav .button:hover {
  cursor: pointer;
}

.nav .button:focus {
  outline: 0;
  box-shadow: 0 0 0 2px rgba(0, 132, 255, 0.5);
}

.chevron {
  border-style: solid;
  border-width: 0.25em 0.25em 0 0;
  content: "";
  height: 0.45em;
  width: 0.45em;
}

.chevron.left {
  transform: rotate(-135deg);
  margin-left: 4px;
}

.chevron.right {
  transform: rotate(45deg);
  margin-right: 4px;
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

input[type="number"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="range"] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  transition: 0.2s;
  background: #3eaf7c;
  border-radius: 1.3px;
}

input[type="range"]::-webkit-slider-thumb {
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

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #3eaf7c;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3eaf7c;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type="range"]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type="range"]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  transition: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

input[type="range"]::-ms-fill-lower {
  background: #3eaf7c;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type="range"]::-ms-fill-upper {
  background: #3eaf7c;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type="range"]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type="range"]:focus::-ms-fill-lower {
  background: #3eaf7c;
}

input[type="range"]:focus::-ms-fill-upper {
  background: #3eaf7c;
}
</style>
