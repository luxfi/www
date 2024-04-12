
import type { Product } from '@hanzo/commerce/types'
import type { CardFamily } from '@/types'
import { formatCurrencyValue } from '@hanzo/commerce'

import MDX_Content from './detail.mdx'
import m from './media'

const fees = {
  initial: 5000,
  annual: 200
}
const byline = `${formatCurrencyValue(fees.initial)} initiation - ${formatCurrencyValue(fees.annual)} yearly`

export default {
  type : 'founder',
  id: 'LXM-CR-F',
  material: 'Cool or Iridescent Chrome',
  parentTitle: 'Lux Credit',
  title: 'Lux Founder Card',
  titleShort: 'Founder',
  ...m.spreadableImg('LXM-CR-F'),
  run: 10000,
  fees,
  byline,
  detail: <MDX_Content />,
  products: [
    {
      id: 'LXM-CR-F-CC',
      sku: 'LXM-CR-F-CC',
      familyId: 'LXM-CR-F',
      familyTitle: 'Founder',
      optionLabel: 'Cool Chrome',
      price: 5000,
      ...m.spreadableOptionImg('LXM-CR-F-CC'),
      ...m.mediaStack('LXM-CR-F-CC'),
    } satisfies Product,
    {
      id: 'LXM-CR-F-IC',
      sku: 'LXM-CR-F-IC',
      familyId: 'LXM-CR-F',
      familyTitle: 'Founder',
      optionLabel: 'Iridescent Chrome',
      price: 5000,
      ...m.spreadableOptionImg('LXM-CR-F-IC'),
      ...m.mediaStack('LXM-CR-F-IC'),
    } satisfies Product,
  ]

} satisfies CardFamily as CardFamily
