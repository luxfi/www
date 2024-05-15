import React from 'react'

import { NavItems } from '@hanzo/ui/primitives'
import { cn } from '@hanzo/ui/util'
import { AuthWidget } from '@hanzo/auth/components'

import { Logo } from '..'

import DesktopBagPopup from '../commerce/desktop-bag-popup'
import BagButton from '../commerce/bag-button'


import type { LinkDef } from '@hanzo/ui/types'

const DesktopHeader: React.FC<{
  currentAs: string | undefined
  links: LinkDef[]
  className?: string
}> = ({
  currentAs,
  links,
  className = ''
}) => {

    // TODO move 13px into a size class and configure twMerge to recognize say, 'text-size-nav' 
    // (vs be beat out by 'text-color-nav')
  return (
    <header className={cn('bg-background fixed z-header top-0 left-0 right-0', className)} >
      {/* md or larger */}
      <div className={
        'flex flex-row h-[80px] items-center  justify-between ' +
        'px-[8px] w-full mx-auto max-w-screen'
      }>
        <Logo size='md' href='/' className='hidden lg:flex' key='two' layout='text-only'/>
        <Logo size='sm' href='/' className='hidden md:flex lg:hidden' key='one' layout='text-only'/>
        {/* md or larger */}
        <div className='flex gap-4 items-center'>
          <NavItems 
            currentAs={currentAs}
            items={links} 
            className='flex md:gap-4 lg:justify-between lg:gap-7' 
            itemClx='font-nav h-8'
            key='three'
          />
          <DesktopBagPopup popupClx='w-[340px]' trigger={<BagButton className='text-primary -mr-[3px] lg:min-w-0' />} />
          <AuthWidget/>
        </div>
      </div>
    </header>
  )
}

export default DesktopHeader

