<template>
  <div class="card-stack-wrapper">
    <VueCardStack
      :cards="cards"
      :cardWidth="287"
      :cardGutter="25"
      :maxVisibleCards="6"
      class="card-stack"
    >
      <template v-slot:card="{ card }">
        <div class="card">
          <img
            :src="card.cover"
            draggable="false"
            :style="{ opacity: 1 - card.$index * (1 / 6) }"
          />
        </div>
      </template>
    </VueCardStack>
  </div>
</template>

<script>
import { VueCardStack } from "./components/VueCardStack";

export default {
  name: "App",
  components: {
    VueCardStack
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
  width: 600px;
  height: 460px;
  // background: red;
}

.card-stack {
  width: 100%;
  height: 100%;
  position: relative;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  overflow: hidden;
  box-shadow: -4px 22px 44px 0px rgba(0, 0, 0, 0.05);
  color: #e3e3e3;
  font-size: 22px;
  width: 100%;
  height: 100%;
  border-radius: 8px;

  > img {
    width: 100%;
    user-select: none;
  }
}
</style>
