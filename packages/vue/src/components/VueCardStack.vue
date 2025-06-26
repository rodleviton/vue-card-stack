<script setup lang="ts" generic="T extends BaseCardData">
import { useCardStack } from '../composables/useCardStack'
import type { BaseCardData, CardStackConfig, CardStackEmits, CardStackProps } from '../types'
import { ref, toRef } from 'vue'

// Props with defaults and types
const props = withDefaults(defineProps<CardStackProps<T>>(), {
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

// Emits
const emit = defineEmits<CardStackEmits>()

// Template ref
const elementRef = ref<HTMLElement | null>(null)

// Convert props to config ref for composable
const config = toRef(
  () =>
    ({
      cardWidth: props.cardWidth,
      cardHeight: props.cardHeight,
      stackWidth: props.stackWidth,
      sensitivity: props.sensitivity,
      maxVisibleCards: props.maxVisibleCards,
      scaleMultiplier: props.scaleMultiplier,
      speed: props.speed,
      paddingHorizontal: props.paddingHorizontal,
      paddingVertical: props.paddingVertical
    }) satisfies CardStackConfig
)

// Use card stack composable
const { stack, containerWidth, originalActiveCardIndex, isDragging, onNext, onPrevious } =
  useCardStack<T>(
    toRef(() => props.cards),
    config,
    elementRef,
    emit
  )
</script>

<template>
  <div
    ref="elementRef"
    :style="{
      position: 'relative'
    }"
  >
    <div
      :style="{
        position: 'relative',
        overflow: 'hidden',
        height: `${props.cardHeight + props.paddingVertical * 2}px`,
        width: containerWidth
      }"
    >
      <div
        v-for="(card, index) in stack"
        :key="card._id"
        :style="{
          position: 'absolute',
          transformOrigin: '0 50%',
          cursor: 'grab',
          left: 0,
          top: 0,
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
          `
        }"
      >
        <slot
          name="card"
          :card="{
            ...card,
            $index: index,
            data: (({ _id, _index, ...rest }) => rest)(card)
          }"
        />
      </div>
    </div>
    <slot
      name="nav"
      :active-card-index="originalActiveCardIndex"
      :on-next="onNext"
      :on-previous="onPrevious"
    />
  </div>
</template>
