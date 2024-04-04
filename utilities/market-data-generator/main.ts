import { writeFileSync } from 'fs'
import { v4 as unique} from 'uuid'
import type { Product, Family } from '@hanzo/commerce/types'

import { type LeafImportData, type NodeImportData } from './types.ts'

import { 
  OUT_DIR, 
  OUT_FN,
  TS,
  DEC,
  ROOT
} from './config.ts'

import IMG from './IMG.ts' 

const families: Family[] = []

const amountStrFromItemToken = (t: string): string => {
  const tokens = t.split(TS)
    // Must lower-case it becuase multibar tokens have an 'X' in them
  const amount = (tokens[0].includes(DEC) ? tokens[0].split(DEC).join('.') : tokens[0]).toLowerCase()
  const unit = tokens[1].toLowerCase() // OZ -> oz
  return amount + unit
}

const visitNode = (
  levelData: NodeImportData, 
  titleTokens: string[] = [],
  skuTokens: string[] = [], 
): void => {

  const levelTitle = levelData.titleToken ?? levelData.label
  const parentTitle = titleTokens.length > 0 ? titleTokens[titleTokens.length - 1] : undefined
  titleTokens.push(levelTitle)   

  skuTokens.push(levelData.tok)

  if (levelData.ch.length > 0 && 'price' in levelData.ch[0]) {

    const familyId = skuTokens.join(TS)

      // Since we are at the leaf level,
      // these are valid for the entire array.
    const bullionForm = titleTokens.pop()
    const previousTitle = titleTokens.filter((el) => (el.length > 0)).join(', ')

        // from LeafImportData to hanzo/cart Product
    const hanzoProducts = (levelData.ch as LeafImportData[]).map(
      (prod) => ({
        id: unique(),

          // add myself to the string
        sku: [...skuTokens, prod.tok].join('-'), 
          // Desired result: "Lux Bullion, Gold, 1oz Minted Bar", ie,
          //  `<previous title tokens joined>, <amount> <form>`
        fullTitle: `${previousTitle}, ${amountStrFromItemToken(prod.tok)} ${bullionForm!}`,
        optionLabel: amountStrFromItemToken(prod.tok),
        familyTitle: bullionForm!,
        familyId: familyId,
        desc: prod.desc ? prod.desc : levelData.desc,
        price: 0,
          // @ts-ignore
        img: IMG[prod.imgCode ?? levelData.imgCode]   
      } satisfies Product)
    )

      // from NodeImportData to hanzo Family
    families.push({
      id: skuTokens.join(TS),
      title: levelTitle,
      parentTitle,
      desc: levelData.desc,
          // @ts-ignore
      img: IMG[levelData.imgCode],
      products: hanzoProducts
    } satisfies Family)
    
  }
  else if (levelData.ch.length > 0 && 'ch' in levelData.ch[0]) {

    const {imgCode: parentImg, desc: parentDesc} = levelData
    const subLevels = levelData.ch as NodeImportData[]
    
    subLevels.forEach(({tok, label, imgCode, desc, ch}) => {
      visitNode({
          tok,
          label,
          imgCode: imgCode ?? parentImg, 
          desc: desc ?? parentDesc,
          ch,
        } satisfies NodeImportData,
          // Each branch (ch levelData) must have it's own fresh copies to reduce
        [...titleTokens], 
        [...skuTokens]
      )
    })
  }
}

visitNode(ROOT as unknown as NodeImportData)

console.log(`Writing Family with their Products to ${OUT_DIR + OUT_FN}...`)
writeFileSync(OUT_DIR + OUT_FN, JSON.stringify(families, null, 2))
console.log('done')
