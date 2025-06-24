interface CardStackOptions {
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
interface Position {
    x: number;
    y: number;
}
interface CardStyle {
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
interface CardData extends CardStyle {
    _id: string;
    _index: number;
    [key: string]: any;
}
interface StackState {
    cards: CardData[];
    activeCardIndex: number;
    isDragging: boolean;
    containerWidth: string;
}
type StackEventType = "move" | "change" | "dragStart" | "dragEnd";
type StackEventCallback = (state: StackState) => void;

declare class CardStackManager {
    private cards;
    private options;
    private width;
    private activeCardIndex;
    private isDragging;
    private dragStartX;
    private dragStartY;
    private isDraggingRight;
    private eventListeners;
    constructor(cards: any[], options: CardStackOptions);
    private getStackWidth;
    private init;
    private get maxVisibleCards();
    private get scaleMultiplier();
    private get xPosOffset();
    private get stackRestPoints();
    private getCardDefaults;
    private rebuild;
    private updateStack;
    private moveStack;
    handleDragStart(position: Position): void;
    handleDragMove(position: Position): void;
    handleDragEnd(): void;
    next(): void;
    previous(): void;
    getState(): StackState;
    on(event: StackEventType, callback: StackEventCallback): void;
    private emit;
}

declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number, immediate?: boolean): (...args: Parameters<T>) => void;

export { type CardData, CardStackManager, type CardStackOptions, type CardStyle, type Position, type StackEventCallback, type StackEventType, type StackState, debounce };
