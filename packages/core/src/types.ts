export interface CardStackOptions {
  cardWidth: number;
  cardHeight: number;
  stackWidth: number | string | null;
  sensitivity: number;
  maxVisibleCards: number;
  scaleMultiplier: number;
  speed: number;
  paddingHorizontal: number;
  paddingVertical: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface CardStyle {
  opacity: number;
  display: string;
  xPos: number;
  yPos: number;
  scale: number;
  width: number;
  height: number;
  zIndex: number;
  isDragging: boolean;
}

export interface CardData extends CardStyle {
  _id: string;
  _index: number;
  [key: string]: any;
}

export interface StackState {
  cards: CardData[];
  activeCardIndex: number;
  isDragging: boolean;
  containerWidth: string;
}

export type StackEventType = "move" | "change" | "dragStart" | "dragEnd";
export type StackEventCallback = (state: StackState) => void;
