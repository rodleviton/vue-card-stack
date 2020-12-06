<template>
  <div
    style="width: 100%; display: flex; align-items: center; flex-direction: column;"
  >
    <vue-card-stack :cards="cards" :stack-width="360" :card-width="280">
      <template v-slot:card="{ card }">
        <div
          style="width: 100%; height: 100%; border-radius: 8px;"
          :style="{ background: card.background }"
        ></div>
      </template>

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
    </vue-card-stack>
  </div>
</template>

<script>
import Vue from "vue";
import VueCardStack from "../../../src/vue-card-stack";
// import VueCardStack from "vue-card-stack";

export default {
  name: "BasicDemo",
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
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" },
      ],
    };
  },
};
</script>

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
</style>
