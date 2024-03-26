import type * as C from '@hanzo/ui/blocks'

import { MiniChart } from '@luxdefi/common'
import { markdown } from '@hanzo/ui/util'
import { BuyItemButton } from '@hanzo/commerce'

import { formatPrice, bullionPrice1oz } from '@/util'

import type ProductDetailBlock from '@/blocks/def/product-detail-block'
import video from './video'
import accordian from './accordian'

export default {
  blockType: 'product-detail',
  title: 'LUX GOLD',
  desc: "Forge your connection to the real world with Lux Gold, crafted with excellence in Dubai. This extraordinary digital collectable is more than a token, —it's the future of hyper-liquid real-world assets. Lux Gold is a embodiment of timeless wealth, prestige, and the synthesis of tradition and innovation. Fully redeemable for physical gold, Lux Gold goes beyond traditional ownership to where gold's timelessness meets the dynamic opportunities of the digital era. It's a seamless gateway where digital ownership evolves into physical reality, enabling any cryptocurrency to fluently be transmuted to gold, and even earn additional yield by lending and providing liquidity in DeFi.",
  video: {...video, sizing: { vh: 80 }},
  accordian,
  price: {
    priceCard: {blockType: 'card',
      title: 'Lux Gold Price  / Oz', 
      content: <div className='h-full w-full flex flex-col justify-center items-center gap-8'>
        <h4 className='text-center font-bold text-3xl'>{formatPrice(bullionPrice1oz('au'))}</h4>
        <BuyItemButton skuPath='LXM-AU' popupClx='w-[340px]' className='lg:min-w-pr-65 min-w-pr-65'>Buy</BuyItemButton>
      </div>,
    } satisfies C.CardBlock,
    msCard: {blockType: 'card',
      specifiers: 'full-width',
      title: 'Market Spot Price / Oz',
      content: <MiniChart symbol='GOLD' />
    } satisfies C.CardBlock,
  },

  blocks: [
    /*
    {
      blockType: 'heading',
      heading: 'Editions'
    } as C.HeadingBlock,
    {
      blockType: 'card',
      specifiers: 'media-left content-left heading-style-title',
      title: 'NEXT MINT',
      content: markdown(`
Available: 1,000,100 oz<br/>
Price: $2000 / oz<br/>
Spot price:: ~$2050 / oz
      `),
      video,
    } as C.CardBlock,
    {
      blockType: 'cta',
      elements: [
        {
          title: 'Buy Now',
          href: "https://mint.lux.network/gold",
          external: true,
          newTab: false,
        },
        {
          href: 'https://docs.lux.network',
          title: 'Read More',
          external: true,
          newTab: false,
          variant: 'outline'
        }
      ]
    } as C.CTABlock,
    */
  ] as C.Block[]
} as ProductDetailBlock

