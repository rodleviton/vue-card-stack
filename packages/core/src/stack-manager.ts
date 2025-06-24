import { debounce } from "./utils/debounce";

import type {
  CardStackOptions,
  Position,
  CardStyle,
  StackState,
  CardData,
  StackEventType,
  StackEventCallback,
} from "./types";

const DEFAULT_OPTIONS: CardStackOptions = {
  cardWidth: 300,
  cardHeight: 400,
  stackWidth: null,
  sensitivity: 0.25,
  maxVisibleCards: 10,
  scaleMultiplier: 0.5,
  speed: 0.2,
  paddingHorizontal: 20,
  paddingVertical: 20,
};

export class CardStackManager {
  private cards: CardData[] = [];
  private options: Required<CardStackOptions>;
  private width: number = 0;
  private activeCardIndex: number = 1;
  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private isDraggingRight: boolean = false;
  private eventListeners: Map<StackEventType, ((state: StackState) => void)[]> =
    new Map();

  constructor(cards: any[], options: CardStackOptions) {
    this.options = {
      cardWidth: options.cardWidth ?? DEFAULT_OPTIONS.cardWidth,
      cardHeight: options.cardHeight ?? DEFAULT_OPTIONS.cardHeight,
      stackWidth: options.stackWidth ?? DEFAULT_OPTIONS.stackWidth,
      sensitivity: options.sensitivity ?? DEFAULT_OPTIONS.sensitivity,
      maxVisibleCards:
        options.maxVisibleCards ?? DEFAULT_OPTIONS.maxVisibleCards,
      scaleMultiplier:
        options.scaleMultiplier ?? DEFAULT_OPTIONS.scaleMultiplier,
      speed: options.speed ?? DEFAULT_OPTIONS.speed,
      paddingHorizontal:
        options.paddingHorizontal ?? DEFAULT_OPTIONS.paddingHorizontal,
      paddingVertical:
        options.paddingVertical ?? DEFAULT_OPTIONS.paddingVertical,
    };

    this.width = this.getStackWidth();
    this.init(cards);
  }

  private getStackWidth(): number {
    if (!this.options.stackWidth) {
      return this.options.cardWidth + this.options.paddingHorizontal * 2;
    } else if (typeof this.options.stackWidth === "number") {
      return this.options.stackWidth;
    }
    return this.options.cardWidth + this.options.paddingHorizontal * 2;
  }

  private init(cards: any[]) {
    // Move bottom card to top of stack (positioned offscreen)
    const reorderedCards = [...cards];
    reorderedCards.unshift(reorderedCards.pop()!);

    this.cards = reorderedCards.map((card, index) => ({
      _id: new Date().getTime() + index + "",
      _index: index,
      ...card,
      ...this.getCardDefaults(index),
    }));
  }

  private get maxVisibleCards() {
    return this.cards.length > this.options.maxVisibleCards
      ? this.options.maxVisibleCards
      : this.cards.length - 1;
  }

  private get scaleMultiplier() {
    return ((this.options.scaleMultiplier - 1) * -1) / 10;
  }

  private get xPosOffset() {
    return (
      (this.width -
        this.options.paddingHorizontal * 2 -
        this.options.cardWidth) /
      (this.maxVisibleCards - 2)
    );
  }

  private get stackRestPoints() {
    return this.cards.map((_, index) => {
      const offset = this.xPosOffset * (index - 1);

      if (!index) {
        return this.width + this.options.paddingHorizontal;
      } else if (index === 1) {
        return (
          this.width - this.options.cardWidth - this.options.paddingHorizontal
        );
      } else {
        return (
          this.width -
          this.options.cardWidth -
          offset -
          this.options.paddingHorizontal
        );
      }
    });
  }

  private getCardDefaults(index: number): CardStyle {
    const scale = index >= 1 ? 1 - this.scaleMultiplier * (index - 1) : 1;
    const xPos = this.stackRestPoints[index];

    return {
      opacity: index > 0 && index < this.maxVisibleCards ? 1 : 0,
      display: index < this.maxVisibleCards + 1 ? "block" : "none",
      xPos: index < this.maxVisibleCards ? xPos : xPos + this.xPosOffset,
      yPos: this.options.paddingVertical,
      scale: scale > 0 ? scale : 0,
      width: this.options.cardWidth,
      height: this.options.cardHeight,
      zIndex: this.cards.length - index,
      isDragging: this.isDragging,
    };
  }

  private rebuild() {
    this.cards = this.cards.map((card, index) => ({
      ...card,
      ...this.getCardDefaults(index),
    }));

    this.emit("change", this.getState());
  }

  private updateStack() {
    const activeCard = this.cards[this.activeCardIndex];
    const activeCardRestPoint = this.stackRestPoints[this.activeCardIndex];
    const distanceTravelled = activeCard.xPos - activeCardRestPoint;
    const minDistanceToTravel =
      (this.options.cardWidth + this.options.paddingHorizontal) /
      (1 / this.options.sensitivity);

    this.emit("move", { ...this.getState(), activeCardIndex: 0 });

    if (this.isDraggingRight) {
      if (distanceTravelled > minDistanceToTravel) {
        this.next();
      } else {
        this.rebuild();
      }
    } else {
      if (distanceTravelled * -1 > minDistanceToTravel) {
        this.previous();
      } else {
        this.rebuild();
      }
    }
  }

  private moveStack(dragXPos: number) {
    const activeCardOffset = dragXPos - this.dragStartX;

    this.emit("move", {
      ...this.getState(),
      activeCardIndex:
        activeCardOffset /
        (this.options.cardWidth + this.options.paddingHorizontal),
    });

    if (this.isDraggingRight) {
      this.activeCardIndex = 1;
    } else {
      this.activeCardIndex = 0; // first card is positioned offscreen
    }

    this.cards = this.cards.map((card, index) => {
      const isActiveCard = index === this.activeCardIndex;
      const defaults = this.getCardDefaults(index);

      const xPos = isActiveCard
        ? defaults.xPos + activeCardOffset
        : defaults.xPos +
          (this.xPosOffset /
            (this.options.cardWidth + this.options.paddingHorizontal)) *
            activeCardOffset;

      const scale = isActiveCard
        ? defaults.scale
        : defaults.scale +
          (this.scaleMultiplier /
            (this.options.cardWidth + this.options.paddingHorizontal)) *
            activeCardOffset;

      return {
        ...card,
        ...defaults,
        xPos,
        scale,
        opacity: index === 0 && !this.isDraggingRight ? 1 : defaults.opacity,
      };
    });

    this.emit("change", this.getState());
  }

  public handleDragStart(position: Position) {
    this.isDragging = true;
    this.dragStartX = position.x;
    this.dragStartY = position.y;
    this.emit("dragStart", this.getState());
  }

  public handleDragMove(position: Position) {
    if (!this.isDragging) return;

    const dragXPos = position.x;
    this.isDraggingRight = dragXPos > this.dragStartX;
    this.moveStack(dragXPos);
  }

  public handleDragEnd() {
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.updateStack();
    this.emit("dragEnd", this.getState());
  }

  public next() {
    const cardToMoveToBottomOfStack = this.cards.shift()!;
    this.cards.push(cardToMoveToBottomOfStack);
    this.rebuild();
  }

  public previous() {
    const cardToMoveToTopOfStack = this.cards.pop()!;
    this.cards.unshift(cardToMoveToTopOfStack);
    this.rebuild();
  }

  public getState(): StackState {
    return {
      cards: this.cards,
      activeCardIndex: this.activeCardIndex,
      isDragging: this.isDragging,
      containerWidth:
        typeof this.options.stackWidth === "number"
          ? `${this.options.stackWidth}px`
          : this.options.stackWidth ??
            `${this.options.cardWidth + this.options.paddingHorizontal * 2}px`,
    };
  }

  public on(event: StackEventType, callback: StackEventCallback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  private emit(event: StackEventType, state: StackState) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => callback(state));
    }
  }
}
