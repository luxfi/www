import { type CardWithSelectedMaterial } from '@/types'

import { NUM_CARDS_DESKTOP, NUM_CARDS_MOBILE } from '../CONST'
import RowHeading from '../row-heading'
import SelectCard from './select-card'
import CardHero from './card-hero'
import PseudoMain from '../../../../components/pseudo-main'

const SelectCardRow: React.FC<{
  selectedCards: CardWithSelectedMaterial[]
  setSelectedCards: (cards: CardWithSelectedMaterial[]) => void
  condensed?: boolean
}> = ({
  selectedCards,
  setSelectedCards,
  condensed
}) => {
  return (
    <PseudoMain className='grid grid-cols-2 lg:grid-cols-11 gap-4 sm:gap-8 lg:gap-16 items-start'>
      {condensed ? (
        <div className='hidden lg:block lg:col-span-2'></div>
      ) : (
        <RowHeading
          title='Compare'
          description='These offers may not be available if you leave this web page and return later.'
          className='text-center lg:text-left typography-h4:!text-3xl'
        />
      )}
      {[...Array(NUM_CARDS_DESKTOP)].map((_, i) => ( (selectedCards[i]) ? (
        <CardHero
          key={i}
          card={selectedCards[i]}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          hiddenOnMobile={i > NUM_CARDS_MOBILE - 1}
          condensed={condensed}
        />
      ) : (
        <SelectCard
          key={i}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          hiddenOnMobile={i > NUM_CARDS_MOBILE - 1}
          condensed={condensed}
        />
      )))}
    </PseudoMain>
  )
}

export {
  SelectCardRow as default,
}