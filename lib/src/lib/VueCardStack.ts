import { defineComponent, h, ref, RendererNode } from "vue"
import { Card, CardDefaults } from "./types"
import { debounce } from "./utils"

/**
 * @module vue-card-stack
 * @example
 * import { VueCardStack, Card } from "vue-card-stack"
 *
 * ...
 * data() {
 *   cards: [
 *     { background: red },
 *     { background: blue },
 *     { background: yellow }
 *   ]
 * }
 * ...
 *
 * @example
 * <template>
 *   <VueCardStack>
 *     <Card
 *       v-for="(card, index) in cards"
 *       :key="index"
 *       :style="{ background: card.background }"
 *     />
 *   </VueCardStack>
 * </template>
 **/

export default defineComponent({
  name: "VueCardStack",
  props: {
    /**
     * Width of card stack in pixels or as a percentage (responsive)
     */
    stackWidth: {
      type: [Number, String]
    },
    /**
     * Width of card in pixels
     */
    cardWidth: {
      type: Number,
      default: () => 300
    },
    /**
     * Height of card in pixels
     */
    cardHeight: {
      type: Number,
      default: () => 400
    },
    /**
     * Distance card must travel as percentage
     */
    sensitivity: {
      type: Number,
      default: () => 0.25
    },
    /**
     * Number of cards that will be visible at any one time
     */
    maxVisibleCards: {
      type: Number,
      default: () => 10
    },
    /**
     * How much a card scales when moved as a percentage
     */
    scaleMultiplier: {
      type: Number,
      default: () => 0.5
    },
    /**
     * Duration in milliseconds for card swipe transition
     */
    speed: {
      type: Number,
      default: () => 0.2
    },
    /**
     * A gutter size in pixels that will be applied to left and right hand side of card stack
     */
    paddingHorizontal: {
      type: Number,
      default: () => 20
    },
    /**
     * A gutter size in pixels that will be applied to top and bottom of card stack
     */
    paddingVertical: {
      type: Number,
      default: () => 20
    }
  },
  data() {
    return {
      activeCardIndex: 1,
      dragStartX: 0,
      isDragging: false,
      isDraggingRight: false,
      stack: [] as Card[],
      width: 0
    }
  },
  setup() {
    const container = ref<HTMLElement | null>(null)

    return {
      container
    }
  },
  created() {
    this.init()
  },
  mounted() {
    const debouncedHandleResize = debounce(this.handleResize, 250)

    window.addEventListener("resize", debouncedHandleResize)
    document.addEventListener(this.touchEndEvent, this.onTouchEnd)

    this.container?.addEventListener(this.touchStartEvent, this.onTouchStart)
  },

  methods: {
    init() {
      this.$nextTick(() => {
        // move bottom card to top of stack (positioned offscreen)
        this.cards.unshift(this.cards.pop() as Card)

        this.stack = this.cards.map((card, index) => ({
          ...card,
          ...this.cardDefaults[index]
        }))
      })
    },
    /**
     * Rebuild the stack
     *
     * @description useful if you need to manually trigger a rebuild
     *
     * @public
     */
    rebuild() {
      this.$nextTick(() => {
        this.stack = this.stack.map((card, index) => ({
          ...card,
          ...this.cardDefaults[index]
        }))
      })
    },
    updateStack() {
      const activeCard = this.stack[this.activeCardIndex]
      const activeCardRestPoint = this.stackRestPoints[this.activeCardIndex]
      const distanceTravelled = activeCard.xPos - activeCardRestPoint
      const minDistanceToTravel = (this.cardWidth + this.paddingHorizontal) / (1 / this.sensitivity)

      this.$emit("move", 0)

      if (this.isDraggingRight) {
        if (distanceTravelled > minDistanceToTravel) {
          const cardToMoveToBottomOfStack = this.stack.shift() as Card
          this.stack.push(cardToMoveToBottomOfStack)
        }
      } else if (distanceTravelled * -1 > minDistanceToTravel) {
        const cardToMoveToTopOfStack = this.stack.pop() as Card
        this.stack.unshift(cardToMoveToTopOfStack)
      }
      this.stack = this.stack.map((card, index) => ({
        ...card,
        ...this.cardDefaults[index]
      }))
    },
    moveStack(dragXPos: number) {
      const activeCardOffset = dragXPos - this.dragStartX

      /**
       * Emitted as card position changes
       *
       * @event move
       * @property {number} example value represents distance card has moved as a percentage
       */
      this.$emit("move", activeCardOffset / (this.cardWidth + this.paddingHorizontal))

      if (this.isDraggingRight) {
        this.activeCardIndex = 1
      } else {
        this.activeCardIndex = 0 // first card is positioned offscreen
      }

      this.activeCards.map((_, index) => {
        const isActiveCard = index === this.activeCardIndex
        const xPos = isActiveCard
          ? this.cardDefaults[index].xPos + activeCardOffset
          : Math.round(this.cardDefaults[index].xPos + this.activeCardXPosOffset * activeCardOffset)

        const scale = isActiveCard
          ? this.cardDefaults[index].scale
          : this.cardDefaults[index].scale + this.activeCardScaleOffset * activeCardOffset

        this.stack[index].xPos = xPos
        this.stack[index].scale = scale
        this.stack[index].opacity =
          index === 0 && !this.isDraggingRight ? 1 : this.cardDefaults[index].opacity
      })
    },
    getDragXPos(e: MouseEvent | TouchEvent): number {
      if (this.isTouch) {
        const event = e as TouchEvent
        return event.touches[0].clientX
      }

      const event = e as MouseEvent
      return event.clientX
    },
    getDragYPos(e: MouseEvent | TouchEvent): number {
      if (this.isTouch) {
        const event = e as TouchEvent
        return event.touches[0].clientY
      }

      const event = e as MouseEvent
      return event.clientY
    },
    onTouchStart(e: MouseEvent | TouchEvent) {
      this.isDragging = true
      this.dragStartX = this.getDragXPos(e) - this.elementXPosOffset

      document.addEventListener(this.dragEvent, this.onDrag)
    },
    onTouchEnd() {
      this.isDragging = false
      this.dragStartX = 0

      document.removeEventListener(this.dragEvent, this.onDrag)
      this.updateStack()
    },
    onDrag(e: MouseEvent | TouchEvent) {
      const dragXPos = this.getDragXPos(e) - this.elementXPosOffset

      this.isDraggingRight = dragXPos > this.dragStartX
      this.moveStack(dragXPos)
    },
    handleResize() {
      this.width = this.$el.clientWidth
      this.rebuild()
    }
  },
  computed: {
    activeCards(): Card[] {
      return this.stack.slice(0, this.maxVisibleCards + 2)
    },
    activeCardXPosOffset(): number {
      return this.xPosOffset / (this.cardWidth + this.paddingHorizontal)
    },
    activeCardScaleOffset(): number {
      return this.normalizedScaleMultiplier / (this.cardWidth + this.paddingHorizontal)
    },
    cards(): Card[] {
      const slots = this.$slots.default ? this.$slots.default() : []
      const children = slots[0]?.children?.length
        ? (slots[0].children as RendererNode[])
        : ([] as RendererNode[])

      return (
        (children.map(x => ({
          id: x.key
        })) as Card[]) || ([] as Card[])
      )
    },
    normalizedStackWidth(): number {
      if (!this.stackWidth) {
        return this.cardWidth + this.paddingHorizontal * 2
      }

      if (typeof this.stackWidth === "number") {
        return this.stackWidth
      }

      return this.width || this.$el.clientWidth
    },
    normalizedMaxVisibleCards(): number {
      return this.cards.length > this.maxVisibleCards ? this.maxVisibleCards : this.cards.length - 1
    },
    normalizedScaleMultiplier(): number {
      return ((this.scaleMultiplier - 1) * -1) / 10
    },
    containerWidth(): string {
      if (!this.stackWidth) {
        return `${this.cardWidth + this.paddingHorizontal * 2}px`
      }
      if (typeof this.stackWidth === "number") {
        return `${this.stackWidth}px`
      }

      return this.stackWidth
    },
    elementXPosOffset(): number {
      return this.$el.getBoundingClientRect().x
    },
    isTouch(): boolean {
      return "ontouchstart" in window
    },
    dragEvent(): "touchmove" | "mousemove" {
      return this.isTouch ? "touchmove" : "mousemove"
    },
    touchStartEvent(): "touchstart" | "mousedown" {
      return this.isTouch ? "touchstart" : "mousedown"
    },
    touchEndEvent(): "touchend" | "mouseup" {
      return this.isTouch ? "touchend" : "mouseup"
    },
    stackRestPoints(): number[] {
      return this.cards.map((_, index) => {
        const offset = this.xPosOffset * (index - 1)

        if (!index) {
          return this.normalizedStackWidth + this.paddingHorizontal
        }

        if (index === 1) {
          return this.normalizedStackWidth - this.cardWidth - this.paddingHorizontal
        }

        return this.normalizedStackWidth - this.cardWidth - offset - this.paddingHorizontal
      })
    },
    cardDefaults(): CardDefaults[] {
      return this.cards.map((_, index) => {
        const scale = index >= 1 ? 1 - this.normalizedScaleMultiplier * (index - 1) : 1

        const xPos = this.stackRestPoints[index]

        return {
          opacity: index > 0 && index < this.normalizedMaxVisibleCards ? 1 : 0,
          display: index < this.normalizedMaxVisibleCards + 1 ? "block" : "none",
          xPos: index < this.normalizedMaxVisibleCards ? xPos : xPos + this.xPosOffset,
          yPos: this.paddingVertical,
          scale: scale > 0 ? scale : 0,
          width: this.cardWidth,
          height: this.cardHeight,
          zIndex: this.cards.length - index
        }
      })
    },
    xPosOffset(): number {
      return (
        (this.normalizedStackWidth - this.paddingHorizontal * 2 - this.cardWidth) /
        (this.normalizedMaxVisibleCards - 2)
      )
    }
  },
  render() {
    const slots = this.$slots.default ? this.$slots.default() : []

    const children = slots[0]?.children?.length
      ? (slots[0].children as RendererNode[])
      : ([] as RendererNode[])

    return h(
      "div",
      {
        ref: "container",
        style: {
          position: "relative",
          height: `${this.cardHeight + this.paddingVertical * 2}px`,
          width: this.containerWidth
        }
      },
      [
        ...children.map(x => {
          const card = this.activeCards.find(j => {
            return x.key === j.id
          })

          if (card) {
            const { speed, isDragging } = this

            if (card.display === "none") {
              return null
            }

            const style = {
              position: "absolute",
              transformOrigin: "0 50%",
              cursor: "grab",
              opacity: card.opacity,
              top: `${card.yPos}px`,
              width: `${card.width}px`,
              height: `${card.height}px`,
              zIndex: card.zIndex,
              transition: `transform ${isDragging ? 0 : speed}s ease, opacity ${speed}s ease`,
              transform: `scale(${card.scale}, ${card.scale}) translate(${card.xPos}px, 0)`
            }

            return h(
              x.type,
              {
                ...x.props,
                id: card.id,
                style: { ...style, ...x.props.style }
              },
              /**
               * @slot Slot for individual card in stack
               */
              x.children
            )
          }
        })
      ]
    )
  }
})
