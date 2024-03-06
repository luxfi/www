'use client'
import React, { 
  useState, 
  Suspense,
  type PropsWithChildren
} from 'react'
import { observer } from 'mobx-react-lite'

import { Skeleton, type ButtonSizes } from '@hanzo/ui/primitives'
import { cn } from '@hanzo/ui/util'

import { useCommerce, useSyncSkuParamWithCurrentItem, type StringMutator } from '@hanzo/commerce'

import { 
  AddToCartWidget,
  Cart, 
  FacetsWidget,
  ProductSelectionRadioGroup, 
} from '@hanzo/commerce/components'

import CartDrawer from '@/components/cart-drawer'
import siteDef from '@/siteDef'

import CardDetail from './card-detail'

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

const CAT_LEVEL = 2

const BuyPage: React.FC<Props> = ({ searchParams }) => {

  const cmmc = useCommerce() 

  const [message, setMessage] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const getMutator = (level: number): StringMutator => {

    const setLevel = (value: string, level: number ): void  => {
      const facets = cmmc.facetsValue
      facets[level] = [value]
      cmmc.setFacets(facets)
    }
  
    const getLevelValueSafe = (level: number): string | null => {
      const facets = cmmc.facetsValue
      if (!(level in facets) || facets[level].length === 0 ) {
        return null
      }
      return facets[level][0]
    }

    return {
      get: () => (getLevelValueSafe(level)),
      set: (v: string) => {setLevel(v, level)}
    } satisfies StringMutator
  } 

  const mutators: StringMutator[] = []
    // Note that level index has nothing to 
    // do with the indeces of the mutators array
    // passed to the FacetsWiddget. 
  for (let i = 1; i < CAT_LEVEL; i++) {
    mutators.push(getMutator(i))
  } 

    // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    // useSeachParams is called by a library we use to impl this hook.
    // So this component should always be within in Suspense boundary.
  useSyncSkuParamWithCurrentItem(CAT_LEVEL, setMessage, setLoading)  

  const mobile = (searchParams?.agent === 'phone')

  const FacetsArea: React.FC<PropsWithChildren & {className?: string}> = ({
    children,
    className=''
  }) => {

    const widgetClx = 'bg-background flex flex-row justify-between w-full sm:w-pr-70 items-center md:justify-start ' + 
      'sm:gap-x-4 xs:gap-x-2 sm:items-start ' + (mobile ? 'h-14 relative pb-3' : 'h-16')  

    const facets1Clx = 'grid grid-cols-4 w-full gap-0 h-full ' + (mobile ? 'border rounded-lg' : '')  

    return !loading ? (
      <FacetsWidget
          // using neg margin to compensate for fw putting extra rt padding on shopping cart button
        className={cn(widgetClx, className)} 
        isMobile={mobile}
        facetClx={[facets1Clx]}
        facetItemClx={'border-r last:border-0'}
        mutators={mutators} 
        facets={siteDef.ext.commerce.facets}
        tabSize='hfull'
      >
        {children}
      </FacetsWidget>
    ) : (
      <Skeleton className={'h-12 ' + className} />
    )
  }
  
  const StoreCart: React.FC<{className?: string}> = ({
    className=''
  }) => {
    return !loading ? (
      <Cart isMobile={mobile} className={className}>
        <h4 className='text-center font-nav text-xl'>Your Cart</h4>
      </Cart>
    ) : (
      <div className={cn('h-40 bg-level-1 rounded-xl' , className)}/>
    )
  }

  const BuyButtonArea: React.FC<{ 
    size: ButtonSizes, 
    className?:  string
  }> = ({
    size,
    className=''
  }) => (
    <div className={'self-center ml-3 grow' + className}>
      {cmmc.specifiedCategories && cmmc.specifiedCategories.length > 0 && (
        <ProductSelectionRadioGroup 
          products={cmmc.specifiedCategories[0].products}
          selectedSku={cmmc.currentItem?.sku ?? undefined}  
          onValueChange={cmmc.setCurrentItem.bind(cmmc)}
          groupClx='xs:flex sm:grid grid-cols-2 gap-0 gap-y-3 gap-x-8 md:hidden'
          itemClx='flex flex-row gap-2 items-center min-w-fit' // lg:whitespace-nowrap 
          showPrice={false}
        />      
      )}
      {cmmc.currentItem && <AddToCartWidget size={size} item={cmmc.currentItem} className={'w-pr-70 mx-auto mt-3 min-w-fit'}/>}

    </div> 

  )

  const Stage: React.FC<{className?: string}> = observer(({
    className=''
  }) => ( message || !cmmc.specifiedCategories || cmmc.specifiedCategories.length === 0 ? (
    <div className={cn(
      'typography lg:min-w-[400px] lg:max-w-[600px] overflow-hidden bg-level-1 h-[50vh] rounded-xl p-6', 
      className
    )} >
      <h5 className='text-accent text-center'>{message ?? ''}</h5>
    </div>
    ) : (
      <CardDetail  
        className={className} 
        category={cmmc.specifiedCategories[0]} 
        mobile={mobile} 
        lineItemRef={cmmc}
        handleItemSelected={cmmc.setCurrentItem.bind(cmmc)}
        isLoading={loading}
     />
    ) 
  ))

  const cartColumnClx = 'hidden md:block min-w-[300px] lg:min-w-[340px] xl:min-w-[360px]'

  return mobile ? (
    <div /* id='SCV_COL_CONTAINER' */ className='flex flex-col justify-start items-stretch relative w-full' >
      <CartDrawer 
        isMobile={true} 
        className='md:hidden pr-1 text-primary relative' 
        buttonClx='fixed right-2 top-[48px] w-11 h-9 z-50' 
      >
        <Cart isMobile={true} className='p-0 border-none mt-12'/>
      </CartDrawer>
      <Stage />
      <FacetsArea className='sm:w-full sticky left-0 right-0 bottom-0' />
    </div>
  ) : (
      <div /* id='SCV_COL_CONTAINER' */ className='flex flex-row justify-start gap-6 items-stretch relative h-full pt-3'>
        <div /* id='SCV_STAGE_COL' */ className='grow flex flex-col h-full relative'>
          <Stage />
          <div /* id='SCV_FACET_CONTAINER_BIG' */ className='bg-background pb-2 flex flex-row justify-between '>
            <BuyButtonArea size='sm' /> 
            <FacetsArea className='' />  
          </div>
        </div>
        <div /* id='SCV_CART_COLUMN' */ className={cn('z-30',  cartColumnClx)}>
          <StoreCart className='sticky z-30 top-[146px] lg:top-[80px]' />
        </div>
      </div> 
  )
} 

/*
          <CartDrawer className='md:hidden pr-1 text-primary relative' buttonClassName='h-9' >
            <Cart isMobile={mobile} className='p-0 border-none mt-12'/>
          </CartDrawer>
*/

const BuyPageWrapper: React.FC<Props> = ({ searchParams }) => (

  <Suspense fallback={<Skeleton className='w-full h-[80vh]' />}>
    <BuyPage searchParams={searchParams} />
  </Suspense>
)

export default BuyPageWrapper