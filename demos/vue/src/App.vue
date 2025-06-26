<script setup lang="ts">
import type { CardData } from './types'
import { createVueCardStack } from '@card-stack/vue'
import { ref } from 'vue'

// Create a strongly typed component for our CardData
const VueCardStack = createVueCardStack<CardData>()

const cards = ref<CardData[]>([
  { background: '#00659d' },
  { background: '#00abbc' },
  { background: '#e2c58a', title: 'Card 1' },
  { background: '#fc8890' },
  { background: '#b35d7f' },
  { background: '#00659d' },
  { background: '#00abbc' },
  { background: '#e2c58a' },
  { background: '#fc8890' },
  { background: '#b35d7f' },
  { background: '#00659d' },
  { background: '#00abbc' },
  { background: '#e2c58a' },
  { background: '#fc8890' },
  { background: '#b35d7f' }
])

const onMove = (value: number) => {
  console.log('Card moving:', value)
}
</script>

<template>
  <div class="app">
    <h1>Vue Card Stack Demo</h1>
    <VueCardStack
      :cards="cards"
      :stack-width="460"
      :card-width="300"
      :card-height="460"
      :max-visible-cards="6"
      @move="onMove"
    >
      <template #card="{ card }">
        <div class="card" :style="{ background: card.data.background }">
          <p v-if="card.data.title">{{ card.data.title }}</p>
        </div>
      </template>
      <template #nav="{ activeCardIndex, onNext, onPrevious }">
        <nav class="nav">
          <div class="counter">{{ (activeCardIndex ?? 0) + 1 }}/{{ cards.length }}</div>
          <button class="button" @click="onPrevious">Previous</button>
          <button class="button" @click="onNext">Next</button>
        </nav>
      </template>
    </VueCardStack>
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.card p {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.nav {
  margin-top: 20px;
  display: flex;
  gap: 16px;
  align-items: center;
}

.counter {
  font-size: 16px;
  margin: 0 16px;
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #333;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background: #444;
}
</style>
