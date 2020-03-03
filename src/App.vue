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
        :scaleMultiplier="scaleMultiplier"
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

export default {
  name: "App",
  components: {
    VueCardStack
  },
  data() {
    return {
      maxVisibleCards: 12,
      containerWidth: 460,
      scaleMultiplier: 0.025
    };
  },
  mounted() {
    console.log(this.$refs.stack);
  },
  computed: {
    cards() {
      return [
        {
          id: 1,
          title: "The Martian",
          release: "10.2.18",
          cover: "img/covers/the-martian.jpg",
          rating: 2,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 2,
          title: "Blade Runner 2049",
          release: "10.6.17",
          cover: "img/covers/blade-runner.jpg",
          rating: 5,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 3,
          title: "Justice League",
          release: "10.6.17",
          cover: "img/covers/justice-league.jpg",
          rating: 1,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 4,
          title: "Ex Machina",
          release: "10.6.17",
          cover: "img/covers/ex-machina.jpg",
          rating: 4,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 5,
          title: "Alien",
          release: "10.6.17",
          cover: "img/covers/alien.jpg",
          rating: 3,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 6,
          title: "Interstellar",
          release: "10.6.17",
          cover: "img/covers/interstellar.jpg",
          rating: 5,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 1,
          title: "The Martian",
          release: "10.2.18",
          cover: "img/covers/the-martian.jpg",
          rating: 2,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 2,
          title: "Blade Runner 2049",
          release: "10.6.17",
          cover: "img/covers/blade-runner.jpg",
          rating: 5,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 3,
          title: "Justice League",
          release: "10.6.17",
          cover: "img/covers/justice-league.jpg",
          rating: 1,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 4,
          title: "Ex Machina",
          release: "10.6.17",
          cover: "img/covers/ex-machina.jpg",
          rating: 4,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 5,
          title: "Alien",
          release: "10.6.17",
          cover: "img/covers/alien.jpg",
          rating: 3,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 6,
          title: "Interstellar",
          release: "10.6.17",
          cover: "img/covers/interstellar.jpg",
          rating: 5,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 1,
          title: "The Martian",
          release: "10.2.18",
          cover: "img/covers/the-martian.jpg",
          rating: 2,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 2,
          title: "Blade Runner 2049",
          release: "10.6.17",
          cover: "img/covers/blade-runner.jpg",
          rating: 5,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 3,
          title: "Justice League",
          release: "10.6.17",
          cover: "img/covers/justice-league.jpg",
          rating: 1,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 4,
          title: "Ex Machina",
          release: "10.6.17",
          cover: "img/covers/ex-machina.jpg",
          rating: 4,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 5,
          title: "Alien",
          release: "10.6.17",
          cover: "img/covers/alien.jpg",
          rating: 3,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 6,
          title: "Interstellar",
          release: "10.6.17",
          cover: "img/covers/interstellar.jpg",
          rating: 5,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 1,
          title: "The Martian",
          release: "10.2.18",
          cover: "img/covers/the-martian.jpg",
          rating: 2,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 2,
          title: "Blade Runner 2049",
          release: "10.6.17",
          cover: "img/covers/blade-runner.jpg",
          rating: 5,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 3,
          title: "Justice League",
          release: "10.6.17",
          cover: "img/covers/justice-league.jpg",
          rating: 1,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 4,
          title: "Ex Machina",
          release: "10.6.17",
          cover: "img/covers/ex-machina.jpg",
          rating: 4,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 5,
          title: "Alien",
          release: "10.6.17",
          cover: "img/covers/alien.jpg",
          rating: 3,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        },
        {
          id: 6,
          title: "Interstellar",
          release: "10.6.17",
          cover: "img/covers/interstellar.jpg",
          rating: 5,
          description:
            "<p>A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.</p>"
        }
      ];
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
