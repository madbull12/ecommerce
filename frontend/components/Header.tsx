import Link from 'next/link'
import { useState } from 'react'
import  { IoIosLogIn, IoIosLogOut, IoMdCart }  from 'react-icons/io'
import { useShopContext } from '../lib/context';
import { motion } from 'framer-motion'

const Header = () => {
    const[isLogin,setIsLogin] = useState(true);
    const { cartItems,setShowCart } = useShopContext();

  return (
    <nav className='text-white bg-transparent p-4'>
        <div className='max-w-7xl mx-auto '>
            <ul className='flex justify-between items-center gap-x-3'>
                <li className='font-bold text-xl mr-auto '>
                    <Link href="/">nxtstore.</Link>
                </li>
                <Link href="/" >
                    {isLogin ? (
                        <span className='flex items-center font-semibold gap-x-1  px-4 py-2 cursor-pointer hover:shadow-md duration-200 hover:text-emerald-500 ease-in-out '>
                            <IoIosLogIn />
                            Login
                        </span>
                    ):(
                    <span className='flex items-center font-semibold gap-x-1  px-4 py-2 cursor-pointer hover:shadow-md duration-200 hover:text-emerald-500 ease-in-out '>
                        <IoIosLogOut />
                        Logout
                    </span>
                    )}
                 
                       
                
                </Link>
                <li className='relative' onClick={()=>setShowCart(true)} >
                    

                        <span >
                            <IoMdCart  className='duration-200 hover:text-emerald-500 ease-in-out cursor-pointer ' />
                            {cartItems.length > 0 && (
                                <motion.span animate={{ scale:1 }} initial={{ scale:0 }} className='absolute -top-2 bg-emerald-500 rounded-full w-4 h-4 grid place-items-center -right-2 text-xs'>
                                    {cartItems.length}
                                </motion.span>
                            )}
                    
                        </span>
                  
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Header