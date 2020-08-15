<template>
  <VueCardStack
    :card-width="300"
    :card-height="460"
    :stack-width="stackWidth"
    :max-visible-cards="maxVisibleCards"
    :scale-multiplier="scaleMultiplier"
  >
    <Card
      v-for="(card, index) in cards"
      :key="index"
      :style="{ background: card.background }"
      class="card"
    >
      <p>{{ index }}</p>
    </Card>
  </VueCardStack>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { VueCardStack, Card } from "./lib"

export default defineComponent({
  name: "App",
  components: {
    VueCardStack,
    Card
  },
  data() {
    return {
      stackWidth: 440,
      maxVisibleCards: 8,
      containerWidth: 460,
      scaleMultiplier: 0.85,
      colors: ["#78b28b", "#91c0a2", "#acd1b9", "#c7e0d0"],
      cards: [] as { background: string }[]
    }
  },
  created() {
    for (let i = 0; i < 1001; i++) {
      this.cards.push({ background: this.colors[i % 4] })
    }
  }
})
</script>

<style>
html,
body {
  min-height: 100%;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#app {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  border-radius: 10px;
  /* box-shadow: 0 10px 30px 0px rgba(0, 0, 0, 0.05); */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  font-weight: 600;
  user-select: none;
}
</style>
