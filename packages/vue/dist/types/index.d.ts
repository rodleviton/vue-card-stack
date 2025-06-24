/**
 * Base card data interface that all card types must extend
 */
export interface BaseCardData {
    _id?: number;
    _index?: number;
}
/**
 * Configuration options for the card stack component
 */
export interface CardStackConfig {
    /** Width of individual cards in pixels */
    cardWidth: number;
    /** Height of individual cards in pixels */
    cardHeight: number;
    /** Width of the stack container. Can be number (px), string (CSS value), or null for auto */
    stackWidth: number | string | null;
    /** Sensitivity for drag gestures (0-1, higher = more sensitive) */
    sensitivity: number;
    /** Maximum number of visible cards in the stack */
    maxVisibleCards: number;
    /** Scale multiplier for card sizing effect */
    scaleMultiplier: number;
    /** Animation speed in seconds */
    speed: number;
    /** Horizontal padding around the stack */
    paddingHorizontal: number;
    /** Vertical padding around the stack */
    paddingVertical: number;
}
/**
 * Internal card data with positioning and display properties
 */
export interface InternalCard {
    /** Unique identifier for the card */
    _id: number;
    /** Original index in the cards array */
    _index: number;
    /** X position in pixels */
    xPos: number;
    /** Y position in pixels */
    yPos: number;
    /** Scale factor (0-1) */
    scale: number;
    /** Opacity (0-1) */
    opacity: number;
    /** CSS display value */
    display: string;
    /** Z-index for layering */
    zIndex: number;
    /** Width in pixels */
    width: number;
    /** Height in pixels */
    height: number;
    /** Whether the card is currently being dragged */
    isDragging: boolean;
}
/**
 * Touch/Mouse event type union
 */
export type DragEvent = MouseEvent | TouchEvent;
/**
 * Card stack component props
 */
export interface CardStackProps<T extends BaseCardData = BaseCardData> {
    /** Array of card data */
    cards: T[];
    /** Width of individual cards in pixels */
    cardWidth?: number;
    /** Height of individual cards in pixels */
    cardHeight?: number;
    /** Width of the stack container */
    stackWidth?: number | string | null;
    /** Sensitivity for drag gestures */
    sensitivity?: number;
    /** Maximum number of visible cards */
    maxVisibleCards?: number;
    /** Scale multiplier for sizing effect */
    scaleMultiplier?: number;
    /** Animation speed in seconds */
    speed?: number;
    /** Horizontal padding */
    paddingHorizontal?: number;
    /** Vertical padding */
    paddingVertical?: number;
}
/**
 * Component emits
 */
export interface CardStackEmits {
    /** Emitted when cards are being moved/dragged */
    move: [value: number];
}
/**
 * Navigation slot props
 */
export interface NavSlotProps {
    /** Current active card index */
    activeCardIndex: number;
    /** Function to move to next card */
    onNext: () => void;
    /** Function to move to previous card */
    onPrevious: () => void;
}
/**
 * Card slot props
 */
export interface CardSlotProps<T extends BaseCardData = BaseCardData> {
    /** Card data with internal properties */
    card: T & InternalCard;
    /** Current index in the stack */
    $index: number;
}
