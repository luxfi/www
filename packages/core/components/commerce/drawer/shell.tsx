'use client'
import React, {type PropsWithChildren } from 'react'

import { X as LucideX} from 'lucide-react'

import { 
  Button, 
  Drawer, 
  DrawerContent, 
  DrawerHandle,
  type DrawerProps,
} from '@hanzo/ui/primitives'
import { cn } from '@hanzo/ui/util'

import '../../../style/drawer-handle-overrides.css'

const CommerceDrawer: React.FC<PropsWithChildren & 
  Omit<DrawerProps, 'onOpenChange'> & 
  {
    setOpen: (b: boolean) => void
    handleHandleClicked: () => void
    drawerClx?: string
    mobile?: boolean
    micro?: boolean
  }
> = ({
  children,
  open,
  setOpen,
  modal,
  snapPoints,
  setActiveSnapPoint,
  activeSnapPoint,
  handleHandleClicked,
  drawerClx='',
  mobile=false,
  micro=false,
  ...rest
}) => (
    // @ts-ignore
  <Drawer 
    open={open} 
    onOpenChange={setOpen} 
    modal={modal} 
    snapPoints={snapPoints}
    setActiveSnapPoint={setActiveSnapPoint}
    activeSnapPoint={activeSnapPoint}
    fastDragSkipsToEnd={false}
    dragHandleOnly={true}
    handleHandleClicked={handleHandleClicked}
    debugOutput
    {...rest}
  >
    <DrawerContent 
      defaultHandle={false} 
      className={cn(
        (modal  ? 'rounded-t-xl border-muted-2' : 'rounded-t-md border-muted-4' ),
        drawerClx
      )}
    >
      <DrawerHandle 
        className={cn(
          'absolute left-0 right-0 mx-auto ',
          !mobile ? 'cursor-grab active:cursor-grabbing touch-pan-y ' : '',
          (micro && mobile) ? 'top-1 w-[85px] h-2 rounded-[2px] bg-level-1' : '',
          //(!micro ? 'top-2 w-[100px] h-3 rounded-full ' : 'top-1.5 w-[85px] h-2.5 rounded-[2px] '),
          //(!micro ? 'bg-level-3 hover:bg-level-2 ' : 'bg-level-1 hover:bg-level-2 ')
        )} 
      />
      {micro && !mobile && ( // close button
        <Button
          variant='ghost'
          size='icon'
          onClick={() => {setOpen(false)}}
          className={'absolute top-4 right-4 w-8 h-8 group rounded-full p-1 hidden md:flex items-center'}
        >
          <LucideX className='w-6 h-6 text-muted group-hover:text-foreground'/>
        </Button>    
      )}
      {children}
    </DrawerContent>
  </Drawer>
)

export default CommerceDrawer
