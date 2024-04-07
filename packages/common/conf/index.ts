import type { SelectionUISpecifier } from '@hanzo/commerce/types'

export const selectionUISpecifiers = {

  'LXM-CN': {
    singleFamily: 'buttons'
  },  
  'LXM-CR': {
    multiFamily: {
      family: 'carousel',
      inSlide: 'horiz-image-buttons'
    }
  },
  
} satisfies Record<string, SelectionUISpecifier>