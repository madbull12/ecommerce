import React, { ReactNode } from 'react'
import { useShopContext } from '../lib/context'
import { motion } from 'framer-motion'

const Backdrop = ({ children }: {children:ReactNode}) => {
    const { setShowCart } = useShopContext()
  return (
    <motion.div initial={{ opacity:0 }} exit={{ opacity:0 }} animate={{opacity:1}} className='bg-[#00000052] absolute h-full w-full z-[999]' onClick={()=>setShowCart(false)}>
        {children}
    </motion.div>
  )
}

export default Backdrop