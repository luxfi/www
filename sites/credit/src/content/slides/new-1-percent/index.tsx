import type { 
  Block,
  CTABlock, 
  HeadingBlock, 
  EnhHeadingBlock, 
  ElementBlock, 
  ImageBlock, 
  ScreenfulBlock, 
  SpaceBlock,
} from '@hanzo/ui/blocks'

import TrustLogos from './trust-logos'

const finePrint = 'Borrow up to 50% of all your digital assets when you pay with the Lux Credit Card, ' + 
 "the most premium and exclusive card membership program around, that doesn't ever use or effect your credit score."

export default {
  blockType: 'screenful',
  columnSpecifiers: ['vert-center', 'vert-center'],
  mobileOrder: [1, 0], // mobile: card image on top please
  footer: <TrustLogos />,
  contentColumns: [
  [
    {blockType: 'enh-heading', 
      heading: {text: 'The new 1%', level: 1, mb: 6}, 
      byline: {text: 'Never sell your crypto again with our self paying credit card', level: 6}, 
    } satisfies EnhHeadingBlock as Block,
    {blockType: 'space', level: 0} satisfies SpaceBlock as Block,
    {
      blockType: 'cta',
      specifiers: 'left mobile-2-columns',
      elements: [
        {
          title: "View Benefits",
          href: "/",
          variant: 'outline',
        },
        {
          title: "Sign Up",
          href: "/",
          variant: 'primary',
        },
      ]
    } satisfies CTABlock as Block,
    { blockType: 'space', level: 0} satisfies SpaceBlock as Block,
    {
      blockType: 'element',
      element: <p className='text-xxs italic'>{finePrint}</p>
    } satisfies ElementBlock as Block,
  ] , [
      // https://nextjs.org/docs/app/api-reference/components/image#responsive-image-with-fill
    {blockType: 'image',
      src: '/assets/img/cards-1483x1074.png',
      alt: 'cards',
      dim: {w: 1483, h: 1074},
      fullWidthOnMobile: true,
      props: {
        sizes: '900px, 440px', 
        style: {
          width: '100%',
          height: 'auto'
        }
      }
    } satisfies ImageBlock as Block ,
    {blockType: 'element',
      element: <p className='w-full text-sm text-muted-1 !text-right pr-2 max-w-[70vw] mx-auto md:max-w-full md:mx-0 md:pr-[5vw] relative -top-[2vh] lg:-top-[4vh]'>Black Card</p>
    } satisfies ElementBlock as Block
  ]], 
} satisfies ScreenfulBlock as ScreenfulBlock