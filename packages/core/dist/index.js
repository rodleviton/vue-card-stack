"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CardStackManager: () => CardStackManager,
  debounce: () => debounce
});
module.exports = __toCommonJS(index_exports);

// src/stack-manager.ts
var DEFAULT_OPTIONS = {
  cardWidth: 300,
  cardHeight: 400,
  stackWidth: null,
  sensitivity: 0.25,
  maxVisibleCards: 10,
  scaleMultiplier: 0.5,
  speed: 0.2,
  paddingHorizontal: 20,
  paddingVertical: 20
};
var CardStackManager = class {
  constructor(cards, options) {
    this.cards = [];
    this.width = 0;
    this.activeCardIndex = 1;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.isDraggingRight = false;
    this.eventListeners = /* @__PURE__ */ new Map();
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    this.options = {
      cardWidth: (_a = options.cardWidth) != null ? _a : DEFAULT_OPTIONS.cardWidth,
      cardHeight: (_b = options.cardHeight) != null ? _b : DEFAULT_OPTIONS.cardHeight,
      stackWidth: (_c = options.stackWidth) != null ? _c : DEFAULT_OPTIONS.stackWidth,
      sensitivity: (_d = options.sensitivity) != null ? _d : DEFAULT_OPTIONS.sensitivity,
      maxVisibleCards: (_e = options.maxVisibleCards) != null ? _e : DEFAULT_OPTIONS.maxVisibleCards,
      scaleMultiplier: (_f = options.scaleMultiplier) != null ? _f : DEFAULT_OPTIONS.scaleMultiplier,
      speed: (_g = options.speed) != null ? _g : DEFAULT_OPTIONS.speed,
      paddingHorizontal: (_h = options.paddingHorizontal) != null ? _h : DEFAULT_OPTIONS.paddingHorizontal,
      paddingVertical: (_i = options.paddingVertical) != null ? _i : DEFAULT_OPTIONS.paddingVertical
    };
    this.width = this.getStackWidth();
    this.init(cards);
  }
  getStackWidth() {
    if (!this.options.stackWidth) {
      return this.options.cardWidth + this.options.paddingHorizontal * 2;
    } else if (typeof this.options.stackWidth === "number") {
      return this.options.stackWidth;
    }
    return this.options.cardWidth + this.options.paddingHorizontal * 2;
  }
  init(cards) {
    const reorderedCards = [...cards];
    reorderedCards.unshift(reorderedCards.pop());
    this.cards = reorderedCards.map((card, index) => ({
      _id: (/* @__PURE__ */ new Date()).getTime() + index + "",
      _index: index,
      ...card,
      ...this.getCardDefaults(index)
    }));
  }
  get maxVisibleCards() {
    return this.cards.length > this.options.maxVisibleCards ? this.options.maxVisibleCards : this.cards.length - 1;
  }
  get scaleMultiplier() {
    return (this.options.scaleMultiplier - 1) * -1 / 10;
  }
  get xPosOffset() {
    return (this.width - this.options.paddingHorizontal * 2 - this.options.cardWidth) / (this.maxVisibleCards - 2);
  }
  get stackRestPoints() {
    return this.cards.map((_, index) => {
      const offset = this.xPosOffset * (index - 1);
      if (!index) {
        return this.width + this.options.paddingHorizontal;
      } else if (index === 1) {
        return this.width - this.options.cardWidth - this.options.paddingHorizontal;
      } else {
        return this.width - this.options.cardWidth - offset - this.options.paddingHorizontal;
      }
    });
  }
  getCardDefaults(index) {
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
      isDragging: this.isDragging
    };
  }
  rebuild() {
    this.cards = this.cards.map((card, index) => ({
      ...card,
      ...this.getCardDefaults(index)
    }));
    this.emit("change", this.getState());
  }
  updateStack() {
    const activeCard = this.cards[this.activeCardIndex];
    const activeCardRestPoint = this.stackRestPoints[this.activeCardIndex];
    const distanceTravelled = activeCard.xPos - activeCardRestPoint;
    const minDistanceToTravel = (this.options.cardWidth + this.options.paddingHorizontal) / (1 / this.options.sensitivity);
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
  moveStack(dragXPos) {
    const activeCardOffset = dragXPos - this.dragStartX;
    this.emit("move", {
      ...this.getState(),
      activeCardIndex: activeCardOffset / (this.options.cardWidth + this.options.paddingHorizontal)
    });
    if (this.isDraggingRight) {
      this.activeCardIndex = 1;
    } else {
      this.activeCardIndex = 0;
    }
    this.cards = this.cards.map((card, index) => {
      const isActiveCard = index === this.activeCardIndex;
      const defaults = this.getCardDefaults(index);
      const xPos = isActiveCard ? defaults.xPos + activeCardOffset : defaults.xPos + this.xPosOffset / (this.options.cardWidth + this.options.paddingHorizontal) * activeCardOffset;
      const scale = isActiveCard ? defaults.scale : defaults.scale + this.scaleMultiplier / (this.options.cardWidth + this.options.paddingHorizontal) * activeCardOffset;
      return {
        ...card,
        ...defaults,
        xPos,
        scale,
        opacity: index === 0 && !this.isDraggingRight ? 1 : defaults.opacity
      };
    });
    this.emit("change", this.getState());
  }
  handleDragStart(position) {
    this.isDragging = true;
    this.dragStartX = position.x;
    this.dragStartY = position.y;
    this.emit("dragStart", this.getState());
  }
  handleDragMove(position) {
    if (!this.isDragging) return;
    const dragXPos = position.x;
    this.isDraggingRight = dragXPos > this.dragStartX;
    this.moveStack(dragXPos);
  }
  handleDragEnd() {
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.updateStack();
    this.emit("dragEnd", this.getState());
  }
  next() {
    const cardToMoveToBottomOfStack = this.cards.shift();
    this.cards.push(cardToMoveToBottomOfStack);
    this.rebuild();
  }
  previous() {
    const cardToMoveToTopOfStack = this.cards.pop();
    this.cards.unshift(cardToMoveToTopOfStack);
    this.rebuild();
  }
  getState() {
    var _a;
    return {
      cards: this.cards,
      activeCardIndex: this.activeCardIndex,
      isDragging: this.isDragging,
      containerWidth: typeof this.options.stackWidth === "number" ? `${this.options.stackWidth}px` : (_a = this.options.stackWidth) != null ? _a : `${this.options.cardWidth + this.options.paddingHorizontal * 2}px`
    };
  }
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }
  emit(event, state) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => callback(state));
    }
  }
};

// src/utils/debounce.ts
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CardStackManager,
  debounce
});
