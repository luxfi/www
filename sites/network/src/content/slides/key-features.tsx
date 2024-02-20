import type { 
  BulletCardsBlock,
  CTABlock, 
  EnhHeadingBlock, 
  ImageBlock, 
  ScreenfulBlock, 
} from '@hanzo/ui/blocks'

import fireworks from './fireworks-bg'

import { DEF_VIDEO_PROPS } from '@hanzo/ui/util'

export default {
  blockType: 'screenful',
  columnSpecifiers: ['center top'],
  contentColumns: [[
    {blockType: 'enh-heading', heading: {text: 'KEY FEATURES', level: 3}, specifiers: 'center'},
    {blockType: 'space', level: 6},
    {blockType: 'bullet-cards',
      grid: {
        at: { xs: 1, md: 2, lg: {columns: 3, gap: 8}, xl: {columns: 3, gap: 8} },
        mobile: 1
      },
      iconSize: 28,
      cards: [
        {
          text: 'EVM compatibility and interoperability.',
          icon: '/assets/img/icon-eth-475.png'
        },
        {
          text: 'Scale to millions of transactions per second.',
          icon: '/assets/img/icon-speed-475.png'
        },
        {
          text: 'Wallet, Swap, Explore, Bridge, all in one place.',
          icon: '/assets/img/icon-apps-475.png'
        },
        {
          text: 'All-new Native Fiat Currency support.',
          icon: '/assets/img/icon-fiat-coins-475.png'
        },
        {
          text: 'Breakthrough privacy chain and bridge.',
          icon: '/assets/img/icon-security-shield-504.png'
        },
        {
          text: 'Automated security with 24/7 monitoring.',
          icon: '/assets/img/icon-24-7-security-475.png'
        },
        {
          text: 'Regulatory compliant from day one.',
          icon: '/assets/img/icon-regulatory-compliant-475.png'
        },
        {
          text: 'Tax advantaged trading.',
          icon: <p className='font-serif text-[24px] leading-[28px] font-bold  h-[28px] pr-2'>0%</p>
        },
        {
          text: 'Governed by a DAO.',
          icon: '/assets/img/icon-dao-475.png'
        },
      ] 
    } as BulletCardsBlock
  ]]
  // banner: fireworks

}