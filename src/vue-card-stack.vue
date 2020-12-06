<script>
import { debounce } from "./utils/debounce";

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
      type: [Number, String],
      default: () => null
    },
    sensitivity: {
      type: Number,
      default: () => 0.25
    },
    maxVisibleCards: {
      type: Number,
      default: () => 10
    },
    scaleMultiplier: {
      type: Number,
      default: () => 0.5 // last visible card will be 50% scale
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
      width: 0,
      activeCardIndex: 1,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      isDraggingRight: false
    };
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.handleResize)
    this.$el.addEventListener(this.touchStartEvent, this.onTouchStart);
    document.addEventListener(this.touchEndEvent, this.onTouchEnd);
  },
  computed: {
    _stackWidth() {
      if (!this.stackWidth) {
        return this.cardWidth + (this.paddingHorizontal * 2);
      } else if (typeof this.stackWidth === 'number') {
        return this.stackWidth
      }

      return this.width || this.$el.clientWidth
    },
    _maxVisibleCards() {
      return this.cards.length > this.maxVisibleCards
        ? this.maxVisibleCards
        : this.cards.length - 1;
    },
    _scaleMultiplier() {
      return ((this.scaleMultiplier - 1) * -1) / 10;
    },
    containerWidth() {
      if (!this.stackWidth) {
        return `${this.cardWidth + (this.paddingHorizontal * 2)}px`;
      } else if (typeof this.stackWidth === 'number') {
        return `${this.stackWidth}px`
      }
      
      return this.stackWidth
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
          opacity: index > 0 && index < this._maxVisibleCards ? 1 : 0,
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
    },
    originalActiveCardIndex() {
      if (this.stack[this.activeCardIndex]) {
        return this.stack[this.activeCardIndex]._index
      }

      return 0
    }
  },
  methods: {
    init() {
      // move bottom card to top of stack (positioned offscreen)
      this.cards.unshift(this.cards.pop());

      this.stack = this.cards.map((card, index) => {
        return {
          _id: new Date().getTime() + index,
          _index: index,
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
    handleResize: debounce(function() {
      this.width = this.$el.clientWidth
      this.rebuild()
    }, 250),
    onNext() {
      const cardToMoveToBottomOfStack = this.stack.shift();
      this.stack.push(cardToMoveToBottomOfStack);
      this.rebuild();
    },
    onPrevious() {
      const cardToMoveToTopOfStack = this.stack.pop();
      this.stack.unshift(cardToMoveToTopOfStack);
      this.rebuild();
    },
    updateStack() {
      const activeCard = this.stack[this.activeCardIndex];
      const activeCardRestPoint = this.stackRestPoints[this.activeCardIndex];
      const distanceTravelled = activeCard.xPos - activeCardRestPoint;
      const minDistanceToTravel =
        (this.cardWidth + this.paddingHorizontal) / (1 / this.sensitivity);


      this.$emit('move', 0)

      if (this.isDraggingRight) {
        if (distanceTravelled > minDistanceToTravel) {
          this.onNext();
        }
      } else {
        if (distanceTravelled * -1 > minDistanceToTravel) {
          this.onPrevious();
        }
      }
    },
    moveStack(dragXPos) {
      const activeCardOffset = dragXPos - this.dragStartX;

      this.$emit('move', activeCardOffset / (this.cardWidth + this.paddingHorizontal))

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
          scale,
          opacity: index === 0 && !this.isDraggingRight ? 1 : this.cardDefaults[index].opacity 
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
  <div class="vue-card-stack__wrapper">
    <div
      class="vue-card-stack__stack"
      :style="{ height: `${cardHeight + (paddingVertical * 2)}px`, width: containerWidth }"
    >
      <div
        class="vue-card-stack__card"
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
    <slot name="nav" v-bind="{ activeCardIndex: originalActiveCardIndex, onNext, onPrevious }"></slot>
  </div>
</template>

<style scoped>
.vue-card-stack__wrapper {
  position: relative;
}

.vue-card-stack__stack {
  position: relative;
  overflow: hidden;
}

.vue-card-stack__card {
  position: absolute;
  transform-origin: 0 50%;
  cursor: grab;
}
</style>
