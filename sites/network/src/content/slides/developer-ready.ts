import type { 
  CTABlock, 
  EnhHeadingBlock, 
  ImageBlock, 
  ScreenfulBlock, 
} from '@luxdefi/ui/blocks'

const byline = 'Build and launch DeFi apps using pre-built smart contracts for finance, gaming, NFTs, and more. If you are an institution or government, use it for issuing and trading assets and Central Bank digital currencies, finance debt, create digital IDs, track documents, and more.'

export default {
  blockType: 'screenful',
  columnSpecifiers: ['center top text-align-left'],
  contentColumns: [
  [
    {
      blockType: 'enh-heading',
      specifiers: 'mobile-heading-centered preheading-heading-font',
      icon: '/assets/img/icon-eth-475.png',
      iconSize: 40,
      preheading: { text: 'EVM PLATFORM', level: 5, mb: 2 },
      heading: { text: 'DEVELOPER READY', mb: 0 },
      byline: { text: byline, level: 0 },
    } as EnhHeadingBlock,
    { blockType: 'space', level: 0},
  ]],
  //banner: fireworks, 
} as ScreenfulBlock