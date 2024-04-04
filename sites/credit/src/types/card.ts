import { type ReactNode } from 'react'
import type { Family } from '@hanzo/commerce/types'
import type { ImageDef } from '@hanzo/ui/types'

type CardType = 'black' | 'elite' | 'founder' | 'sovereign'

interface CardFamily extends Family {
  type: CardType
  material: string
  run: number
  fees: {
    initial: number
    annual: number
  }
  detail: ReactNode
}

type CardMaterial = {
  title: string
  sku: string
  materialImg: ImageDef
  cardImg: ImageDef
}

type Card = {
  title: string,
  rarity?: string,
  materials: CardMaterial[],
  annualFee: number,
  initiationFee: number,
  replacementFee: number,
  rewardPct: number,
  fxRatePct: number,
  maxAccountHolders: number,
  travelBenefits: React.ReactNode,
  lifestyleBenefits: React.ReactNode,
  rewards: React.ReactNode,
  karmaRewards: React.ReactNode,
}

export {
  type Card,
  type CardFamily,
  type CardMaterial,
  type CardType
}

