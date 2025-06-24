<script setup lang="ts">
import { VueCardStack } from '@card-stack/vue'
import '@card-stack/vue/dist/style.css'
import { ref } from 'vue'
import type { CardData } from './types'

const cards = ref<CardData[]>([
  { background: '#00659d' },
  { background: '#00abbc' },
  { background: '#e2c58a' },
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
    
    <vue-card-stack 
      :cards="cards" 
      :stack-width="460" 
      :card-width="300"
      :card-height="460"
      :max-visible-cards="6"
      @move="onMove"
    >
      <template #card="{ card }">
        <div 
          class="card"
          :style="{ background: card.background }"
        >
        </div>
      </template>

      <template #nav="{ activeCardIndex, onNext, onPrevious }">
        <nav class="nav">
          <div class="counter">{{ (activeCardIndex ?? 0) + 1 }}/{{ cards.length }}</div>
          <button @click="onPrevious" class="button">Previous</button>
          <button @click="onNext" class="button">Next</button>
        </nav>
      </template>
    </vue-card-stack>
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
  justify-content: center;
  align-items: center;
  color: white;
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