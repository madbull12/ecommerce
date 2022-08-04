import React, { ReactNode } from 'react'
import Cart from '../components/Cart';
import Backdrop from '../components/Backdrop';
import { useShopContext } from '../lib/context';
import Header from './Header';
import { AnimatePresence } from 'framer-motion';

const Layout = ({ children }: { children:ReactNode }) => {
  const { showCart } = useShopContext()

  return (
    <div>
        <Header />
        <AnimatePresence>
          {showCart && (
              <Backdrop>
                  <Cart />
              </Backdrop>
          )
          }
        </AnimatePresence>
    
        {children}
    </div>
  )
}

export default Layout