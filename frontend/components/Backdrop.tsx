import React, { ReactNode } from 'react'
import { useShopContext } from '../lib/context'

const Backdrop = ({ children }: {children:ReactNode}) => {
    const { setShowCart } = useShopContext()
  return (
    <div className='bg-[#00000052] absolute top-0 right-0 bottom-0 left-0' onClick={()=>setShowCart(false)}>
        {children}
    </div>
  )
}

export default Backdrop