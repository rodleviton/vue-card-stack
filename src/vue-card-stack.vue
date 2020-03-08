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
      default: () => 300
    },
    cardHeight: {
      type: Number,
      default: () => 400
    },
    stackWidth: {
      type: Number,
      default: () => null
    },
    sensitivity: {
      type: Number,
      default: () => 4
    },
    maxVisibleCards: {
      type: Number,
      default: () => 10
    },
    scaleMultiplier: {
      type: Number,
      default: () => 0.05
    },
    speed: {
      type: Number,
      default: () => 0.2
    },
    paddingHorizontal: {
      type: Number,
      default: () => 20
    },
    paddingVertical: {
      type: Number,
      default: () => 20
    }
  },
  data() {
    return {
      stack: [],
      activeCardIndex: 1,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      isDraggingRight: false
    };
  },
  mounted() {
    this.init();

    this.$el.addEventListener(this.touchStartEvent, this.onTouchStart);
    document.addEventListener(this.touchEndEvent, this.onTouchEnd);
  },
  computed: {
    _stackWidth() {
      return this.stackWidth || this.cardWidth + (this.paddingHorizontal * 2);
    },
    _maxVisibleCards() {
      return this.cards.length > this.maxVisibleCards
        ? this.maxVisibleCards
        : this.cards.length - 1;
    },
    _scaleMultiplier() {
      return ((this.scaleMultiplier - 1) * -1) / 10;
    },
    elementXPosOffset() {
      return this.$el.getBoundingClientRect().x;
    },
    isTouch() {
      return "ontouchstart" in window;
    },
    dragEvent() {
      return this.isTouch ? "touchmove" : "mousemove";
    },
    touchStartEvent() {
      return this.isTouch ? "touchstart" : "mousedown";
    },
    touchEndEvent() {
      return this.isTouch ? "touchend" : "mouseup";
    },
    stackRestPoints() {
      return this.cards.map((item, index) => {
        const offset = this.xPosOffset * (index - 1);

        if (!index) {
          return this._stackWidth + this.paddingHorizontal;
        } else if (index === 1) {
          return this._stackWidth - this.cardWidth - this.paddingHorizontal;
        } else {
          return (
            this._stackWidth - this.cardWidth - offset - this.paddingHorizontal
          );
        }
      });
    },
    cardDefaults() {
      return this.cards.map((card, index) => {
        const scale = index >= 1 ? 1 - this._scaleMultiplier * (index - 1) : 1;
        const xPos = this.stackRestPoints[index];

        return {
          opacity: index < this._maxVisibleCards ? 1 : 0,
          display: index < this._maxVisibleCards + 1 ? "block" : "none",
          xPos: index < this._maxVisibleCards ? xPos : xPos + this.xPosOffset,
          yPos: this.paddingVertical,
          scale: scale > 0 ? scale : 0,
          width: this.cardWidth,
          height: this.cardHeight,
          zIndex: this.cards.length - index
        };
      });
    },
    xPosOffset() {
      return (
        (this._stackWidth - this.paddingHorizontal * 2 - this.cardWidth) /
        (this._maxVisibleCards - 2)
      );
    }
  },
  methods: {
    init() {
      // move bottom card to top of stack (positioned offscreen)
      this.cards.unshift(this.cards.pop());

      this.stack = this.cards.map((card, index) => {
        return {
          _id: new Date().getTime() + index,
          ...card,
          ...this.cardDefaults[index]
        };
      });
    },
    rebuild() {
      this.$nextTick(() => {
        this.stack = this.stack.map((card, index) => {
          return {
            ...card,
            ...this.cardDefaults[index]
          };
        });
      });
    },
    updateStack() {
      const activeCard = this.stack[this.activeCardIndex];
      const activeCardRestPoint = this.stackRestPoints[this.activeCardIndex];
      const distanceTravelled = activeCard.xPos - activeCardRestPoint;
      const minDistanceToTravel =
        (this.cardWidth + this.paddingHorizontal) / this.sensitivity;

      if (this.isDraggingRight) {
        if (distanceTravelled > minDistanceToTravel) {
          const cardToMoveToBottomOfStack = this.stack.shift();
          this.stack.push(cardToMoveToBottomOfStack);
        }
      } else {
        if (distanceTravelled * -1 > minDistanceToTravel) {
          const cardToMoveToTopOfStack = this.stack.pop();
          this.stack.unshift(cardToMoveToTopOfStack);
        }
      }

      this.stack = this.stack.map((card, index) => {
        return {
          ...card,
          ...this.cardDefaults[index]
        };
      });
    },
    moveStack(dragXPos) {
      const activeCardOffset = dragXPos - this.dragStartX;

      if (this.isDraggingRight) {
        this.activeCardIndex = 1;
      } else {
        this.activeCardIndex = 0; // first card is positioned offscreen
      }

      this.stack = this.stack.map((card, index) => {
        const isActiveCard = index === this.activeCardIndex;

        const xPos = isActiveCard
          ? this.cardDefaults[index].xPos + activeCardOffset
          : this.cardDefaults[index].xPos +
            (this.xPosOffset / (this.cardWidth + this.paddingHorizontal)) *
              activeCardOffset;

        const scale = isActiveCard
          ? this.cardDefaults[index].scale
          : this.cardDefaults[index].scale +
            (this._scaleMultiplier /
              (this.cardWidth + this.paddingHorizontal)) *
              activeCardOffset;

        return {
          ...card,
          ...this.cardDefaults[index],
          xPos,
          scale
        };
      });
    },
    getDragXPos(e) {
      return this.isTouch ? e.touches[0].clientX : e.clientX;
    },
    getDragYPos(e) {
      return this.isTouch ? e.touches[0].clientY : e.clientY;
    },
    onTouchStart(e) {
      this.isDragging = true;
      this.dragStartX = this.getDragXPos(e) - this.elementXPosOffset;
      this.dragStartY = this.getDragYPos(e);

      document.addEventListener(this.dragEvent, this.onDrag);
    },
    onTouchEnd() {
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;

      document.removeEventListener(this.dragEvent, this.onDrag);
      this.updateStack();
    },
    onDrag(e) {
      const dragXPos = this.getDragXPos(e) - this.elementXPosOffset;

      this.isDraggingRight = dragXPos > this.dragStartX;
      this.moveStack(dragXPos);
    }
  }
};
</script>

<template>
  <div
    class="vue-card-stack__stack-wrapper"
    :style="{ 'padding-bottom': `${paddingVertical * 2}px`, height: `${cardHeight}px`, width: `${_stackWidth}px` }"
  >
    <div
      class="vue-card-stack__card-wrapper"
      v-for="(card, index) in stack"
      :key="card._id"
      :style="{
        opacity: card.opacity,
        display: card.display,
        top: `${card.yPos}px`,
        width: `${card.width}px`,
        height: `${card.height}px`,
        zIndex: card.zIndex,
        transition: `transform ${
          isDragging ? 0 : speed
        }s ease, opacity ${speed}s ease`,
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

<style scoped>
.vue-card-stack__stack-wrapper {
  position: relative;
  overflow: hidden;
}

.vue-card-stack__card-wrapper {
  position: absolute;
  transform-origin: 0 50%;
  cursor: grab;
}
</style>
