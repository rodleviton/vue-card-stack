/**
 * Example card data type
 */
export interface CardData {
  /** Background color for the card */
  background: string;
  title?: string;
  _id?: string;
  _index?: number;
  opacity?: number;
  display?: string;
  xPos?: number;
  yPos?: number;
  scale?: number;
  width?: number;
  height?: number;
  zIndex?: number;
  isDragging?: boolean;
}

export interface CardStackItem extends CardData {
  $index: number;
  _id: string;
  _index: number;
  style: CardStyle;
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
