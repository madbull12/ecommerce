import React, { ReactNode } from 'react'
import Cart from '../components/Cart';
import Backdrop from '../components/Backdrop';
import { useShopContext } from '../lib/context';
import Header from './Header';

const Layout = ({ children }: { children:ReactNode }) => {
  const { showCart } = useShopContext()

  return (
    <div>
        <Header />
        {showCart && (
            <Backdrop>
                <Cart />
            </Backdrop>
        )
        }
        {children}
    </div>
  )
}

export default Layout