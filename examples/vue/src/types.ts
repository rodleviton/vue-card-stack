import type { BaseCardData } from '@card-stack/vue'

/**
 * Example card data type
 */
export type CardData = BaseCardData & {
  /** Background color for the card */
  background: string
  /** Optional title for the card */
  title?: string
}
