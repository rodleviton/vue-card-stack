export interface Card extends CardDefaults {
  id: number
}

export interface CardDefaults {
  display: "block" | "none"
  height: number
  opacity: number
  scale: number
  width: number
  xPos: number
  yPos: number
  zIndex: number
}
