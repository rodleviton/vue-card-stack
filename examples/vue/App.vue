<template>
  <div class="app">
    <vue-card-stack
      :cards="cards"
      :card-width="300"
      :card-height="400"
      @move="onMove"
      @change="onChange"
    >
      <template #card="{ card }">
        <div class="card" :style="{ backgroundColor: card.color }">
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
        </div>
      </template>
      
      <template #nav="{ activeCardIndex, onNext, onPrevious }">
        <div class="navigation">
          <button @click="onPrevious">Previous</button>
          <span>Card {{ activeCardIndex + 1 }}</span>
          <button @click="onNext">Next</button>
        </div>
      </template>
    </vue-card-stack>
  </div>
</template>

<script>
import { VueCardStack } from '@vue-card-stack/vue';

export default {
  components: {
    VueCardStack
  },
  data() {
    return {
      cards: [
        { title: 'Card 1', description: 'First card', color: '#ff6b6b' },
        { title: 'Card 2', description: 'Second card', color: '#4ecdc4' },
        { title: 'Card 3', description: 'Third card', color: '#45b7d1' },
        { title: 'Card 4', description: 'Fourth card', color: '#96ceb4' },
      ]
    };
  },
  methods: {
    onMove(index) {
      console.log('Card moving:', index);
    },
    onChange(index) {
      console.log('Active card changed:', index);
    }
  }
};
</script>

<style>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.navigation {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #333;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #444;
}
</style> 