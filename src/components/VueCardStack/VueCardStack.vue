<template>
  <div class="vue-card-stack__stack-wrapper">
    <div
      class="vue-card-stack__card-wrapper"
      v-for="(card, index) in stack"
      :key="index"
      :style="{
        display: card.display,
        top: `${card.yPos}px`,
        width: `${card.width}px`,
        zIndex: card.zIndex,
        transform: `
          scale(${card.scale}, ${card.scale}) 
          translate(${card.xPos}px, 0)
        `
      }"
    >
      <slot v-bind:card="{ ...card, $index: index }" name="card"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueCardStack",
  props: {
    cards: {
      type: Array,
      default: () => []
    },
    cardWidth: {
      type: Number,
      default: () => 250
    },
    cardGutter: {
      type: Number,
      default: () => 20
    },
    maxVisibleCards: {
      type: Number,
      default: () => 6
    },
    scaleMultiplier: {
      type: Number,
      default: () => 0.05
    }
  },
  data() {
    return {
      stack: []
    };
  },
  mounted() {
    this.stack = this.cards.map((x, index) => {
      const scale = 1 - this.scaleMultiplier * index;
      return {
        display: index < this.maxVisibleCards ? "block" : "none",
        xPos: this.stackRestXCoordinates[index],
        yPos: 0,
        scale: scale > 0 ? scale : 0,
        width: this.cardWidth,
        zIndex: this.cards.length - index,
        ...x
      };
    });
  },
  computed: {
    stackWidth() {
      return this.$el.clientWidth;
    },
    cardXPosOffset() {
      return (this.stackWidth - this.cardWidth) / (this.maxVisibleCards - 1);
    },
    stackRestXCoordinates() {
      return this.cards.map(
        (item, index) =>
          this.stackWidth -
          this.cardWidth -
          (this.cardGutter - this.cardGutter * this.scaleMultiplier) * index
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.vue-card-stack__stack-wrapper {
  position: relative;
}

.vue-card-stack__card-wrapper {
  position: absolute;
  transition: all 0.2s ease 0s;
  cursor: grab;
  transform-origin: 100% 50%;
}
</style>
