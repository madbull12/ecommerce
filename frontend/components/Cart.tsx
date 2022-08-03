import React from 'react'
import { IProduct } from '../interface';
import { useShopContext } from '../lib/context';
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image';
import { IoIosAddCircle } from 'react-icons/io';
import { AiFillMinusCircle } from 'react-icons/ai';





const Cart = () => {
    const { cartItems,qty,addToCart,removeFromCart } = useShopContext();

    const price = cartItems.map((item:IProduct)=>(item?.quantity * item?.attributes.price))
    console.log(price)

  return (
    <aside className='min-h-screen bg-neutral-700 fixed top-0 right-0 min-w-[30vw] p-4 z-50 text-white' onClick={(e)=>e.stopPropagation()}>
        {cartItems && (
            <>
                   {cartItems.length === 0 ? (
                <h1>You have no cart yet</h1>
            ):(
                <div>
                <h1 className='text-xl font-bold'>Shopping lists</h1>
                <div className='space-y-3 mt-4'>
                    {cartItems?.map((item:IProduct)=>(
                        <div key={uuidv4()} className='flex gap-x-3 p-2 bg-stone-300 text-stone-700 '>
                            <Image alt={item?.attributes.title} src={item?.attributes.image.data.attributes.formats.small.url} height={60} width={60} />
                            <div>
                                <p>{item?.attributes.title}</p>
                                <p>${item?.attributes.price}</p>
                                <div className='flex items-center gap-x-2'>
                                    <p>Quantity</p>
                                    <div className='flex gap-x-2 items-center'>
                                        <IoIosAddCircle className='cursor-pointer hover:text-emerald-400' onClick={()=>addToCart(item,1)} />
                
                                        <span>{item?.quantity}</span>
                                        <AiFillMinusCircle className='cursor-pointer hover:text-emerald-400' onClick={()=>removeFromCart(item?.attributes.slug)} />
                
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className='mt-2'>Total: ${price.reduce((acc:any,cur:any)=>acc + cur,0)}</p>
            

                </div>

    )}
            </>
     
        )}
  
    </aside>
  )
}

export default Cart