<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  cards: any[];
  cardWidth?: number;
  cardHeight?: number;
  stackWidth?: number | string | null;
  sensitivity?: number;
  maxVisibleCards?: number;
  scaleMultiplier?: number;
  speed?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
}>(), {
  cardWidth: 300,
  cardHeight: 400,
  stackWidth: null,
  sensitivity: 0.25,
  maxVisibleCards: 10,
  scaleMultiplier: 0.5,
  speed: 0.2,
  paddingHorizontal: 20,
  paddingVertical: 20
})

const emit = defineEmits<{
  (e: 'move', value: number): void
}>()

// Data
const stack = ref<any[]>([])
const width = ref(0)
const activeCardIndex = ref(1)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const isDraggingRight = ref(false)

// Template ref
const elementRef = ref<HTMLElement | null>(null)

// Computed properties - exact copies from original
const _stackWidth = computed(() => {
  if (!props.stackWidth) {
    return props.cardWidth + props.paddingHorizontal * 2
  } else if (typeof props.stackWidth === 'number') {
    return props.stackWidth
  }
  return width.value || (elementRef.value?.clientWidth || 0)
})

const _maxVisibleCards = computed(() => {
  return props.cards.length > props.maxVisibleCards
    ? props.maxVisibleCards
    : props.cards.length - 1
})

const _scaleMultiplier = computed(() => {
  return ((props.scaleMultiplier - 1) * -1) / 10
})

const containerWidth = computed(() => {
  if (!props.stackWidth) {
    return `${props.cardWidth + props.paddingHorizontal * 2}px`
  } else if (typeof props.stackWidth === 'number') {
    return `${props.stackWidth}px`
  }
  return props.stackWidth
})

const elementXPosOffset = computed(() => {
  return elementRef.value?.getBoundingClientRect().x || 0
})

const isTouch = computed(() => 'ontouchstart' in window)
const dragEvent = computed(() => isTouch.value ? 'touchmove' : 'mousemove')
const touchStartEvent = computed(() => isTouch.value ? 'touchstart' : 'mousedown')
const touchEndEvent = computed(() => isTouch.value ? 'touchend' : 'mouseup')

const stackRestPoints = computed(() => {
  return props.cards.map((item, index) => {
    const offset = xPosOffset.value * (index - 1)

    if (!index) {
      return _stackWidth.value + props.paddingHorizontal
    } else if (index === 1) {
      return _stackWidth.value - props.cardWidth - props.paddingHorizontal
    } else {
      return (
        _stackWidth.value - props.cardWidth - offset - props.paddingHorizontal
      )
    }
  })
})

const cardDefaults = computed(() => {
  return props.cards.map((card, index) => {
    const scale = index >= 1 ? 1 - _scaleMultiplier.value * (index - 1) : 1
    const xPos = stackRestPoints.value[index]

    return {
      opacity: index > 0 && index < _maxVisibleCards.value ? 1 : 0,
      display: index < _maxVisibleCards.value + 1 ? "block" : "none",
      xPos: index < _maxVisibleCards.value ? xPos : xPos + xPosOffset.value,
      yPos: props.paddingVertical,
      scale: scale > 0 ? scale : 0,
      width: props.cardWidth,
      height: props.cardHeight,
      zIndex: props.cards.length - index,
      isDragging: isDragging.value
    }
  })
})

const xPosOffset = computed(() => {
  return (
    (_stackWidth.value - props.paddingHorizontal * 2 - props.cardWidth) /
    (_maxVisibleCards.value - 2)
  )
})

const originalActiveCardIndex = computed(() => {
  if (stack.value[activeCardIndex.value]) {
    return stack.value[activeCardIndex.value]._index
  }
  return 0
})

// Methods - exact copies from original
const init = () => {
  // move bottom card to top of stack (positioned offscreen)
  const cards = [...props.cards]
  cards.unshift(cards.pop()!)

  stack.value = cards.map((card, index) => {
    return {
      _id: new Date().getTime() + index,
      _index: index,
      ...card,
      ...cardDefaults.value[index],
    }
  })
  
  // Debug: Check yPos values
  console.log('Card yPos values:', stack.value.map(card => ({ id: card._id, yPos: card.yPos })))
  console.log('PaddingVertical:', props.paddingVertical)
}

const rebuild = () => {
  nextTick(() => {
    stack.value = stack.value.map((card, index) => {
      return {
        ...card,
        ...cardDefaults.value[index],
      }
    })
  })
}

const handleResize = () => {
  if (elementRef.value) {
    width.value = elementRef.value.clientWidth
    rebuild()
  }
}

const onNext = () => {
  const cardToMoveToBottomOfStack = stack.value.shift()
  stack.value.push(cardToMoveToBottomOfStack)
  rebuild()
}

const onPrevious = () => {
  const cardToMoveToTopOfStack = stack.value.pop()
  stack.value.unshift(cardToMoveToTopOfStack)
  rebuild()
}

const updateStack = () => {
  const activeCard = stack.value[activeCardIndex.value]
  const activeCardRestPoint = stackRestPoints.value[activeCardIndex.value]
  const distanceTravelled = activeCard.xPos - activeCardRestPoint
  const minDistanceToTravel =
    (props.cardWidth + props.paddingHorizontal) / (1 / props.sensitivity)

  emit("move", 0)

  if (isDraggingRight.value) {
    if (distanceTravelled > minDistanceToTravel) {
      onNext()
    } else {
      rebuild()
    }
  } else {
    if (distanceTravelled * -1 > minDistanceToTravel) {
      onPrevious()
    } else {
      rebuild()
    }
  }
}

const moveStack = (dragXPos: number) => {
  const activeCardOffset = dragXPos - dragStartX.value

  emit(
    "move",
    activeCardOffset / (props.cardWidth + props.paddingHorizontal)
  )

  if (isDraggingRight.value) {
    activeCardIndex.value = 1
  } else {
    activeCardIndex.value = 0 // first card is positioned offscreen
  }

  stack.value = stack.value.map((card, index) => {
    const isActiveCard = index === activeCardIndex.value
    const xPos = isActiveCard
      ? cardDefaults.value[index].xPos + activeCardOffset
      : cardDefaults.value[index].xPos +
        (xPosOffset.value / (props.cardWidth + props.paddingHorizontal)) *
          activeCardOffset

    const scale = isActiveCard
      ? cardDefaults.value[index].scale
      : cardDefaults.value[index].scale +
        (_scaleMultiplier.value /
          (props.cardWidth + props.paddingHorizontal)) *
          activeCardOffset

    return {
      ...card,
      ...cardDefaults.value[index],
      xPos,
      scale,
      opacity:
        index === 0 && !isDraggingRight.value
          ? 1
          : cardDefaults.value[index].opacity,
    }
  })
}

const getDragXPos = (e: MouseEvent | TouchEvent) => {
  return isTouch.value ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
}

const getDragYPos = (e: MouseEvent | TouchEvent) => {
  return isTouch.value ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY
}

const onTouchStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  dragStartX.value = getDragXPos(e) - elementXPosOffset.value
  dragStartY.value = getDragYPos(e)

  document.addEventListener(dragEvent.value, onDrag)
}

const onTouchEnd = () => {
  isDragging.value = false
  dragStartX.value = 0
  dragStartY.value = 0

  document.removeEventListener(dragEvent.value, onDrag)
  updateStack()
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  const dragXPos = getDragXPos(e) - elementXPosOffset.value

  isDraggingRight.value = dragXPos > dragStartX.value
  moveStack(dragXPos)
}

onMounted(() => {
  init()
  window.addEventListener("resize", handleResize)
  if (elementRef.value) {
    elementRef.value.addEventListener(touchStartEvent.value, onTouchStart)
  }
  document.addEventListener(touchEndEvent.value, onTouchEnd)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
  if (elementRef.value) {
    elementRef.value.removeEventListener(touchStartEvent.value, onTouchStart)
  }
  document.removeEventListener(touchEndEvent.value, onTouchEnd)
  document.removeEventListener(dragEvent.value, onDrag)
})
</script>

<template>
  <div class="vue-card-stack__wrapper" ref="elementRef">
    <div
      class="vue-card-stack__stack"
      :style="{
        height: `${props.cardHeight + props.paddingVertical * 2}px`,
        width: containerWidth,
      }"
    >
      <div
        class="vue-card-stack__card"
        v-for="(card, index) in stack"
        :key="card._id"
        :style="{
          opacity: card.opacity,
          display: card.display,
          width: `${card.width}px`,
          height: `${card.height}px`,
          zIndex: card.zIndex,
          transition: `transform ${
            isDragging ? 0 : props.speed
          }s ease, opacity ${props.speed}s ease`,
          transform: `
            scale(${card.scale}, ${card.scale}) 
            translate(${card.xPos}px, ${card.yPos}px)
          `,
        }"
      >
        <slot name="card" v-bind:card="{ ...card, $index: index }"></slot>
      </div>
    </div>
    <slot
      name="nav"
      :active-card-index="originalActiveCardIndex"
      :on-next="onNext"
      :on-previous="onPrevious"
    ></slot>
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
  left: 0;
  top: 0;
}
</style>
