<template>
  <vue-card-stack :cards="cards" stack-width="100%">
    <template v-slot:card="{ card }">
      <div style="width: 100%; height: 100%; border-radius: 8px;" :style="{ background: card.background }"></div>
    </template>
  </vue-card-stack>
</template>

<script>
import Vue from "vue";
import VueCardStack from "../../../src/vue-card-stack";

export default {
  name: "BasicDemo",
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
        { background: "#b35d7f" },
        { background: "#00659d" },
        { background: "#00abbc" },
        { background: "#e2c58a" },
        { background: "#fc8890" },
        { background: "#b35d7f" }
      ]
    };
  }
};
</script>

<style scoped>
.card {
  height: 100%;
  border-radius: 8px;
}
</style>