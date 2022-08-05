/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { IProduct } from '../interface';
import { useShopContext } from '../lib/context';
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image';
import { IoIosAddCircle } from 'react-icons/io';
import { AiFillMinusCircle } from 'react-icons/ai';
import {  motion } from 'framer-motion';
import { IoCart } from 'react-icons/io5'
import getStripe from '../lib/getStripe';

const Cart = () => {
    const { cartItems,qty,addToCart,removeFromCart } = useShopContext();

    const price = cartItems.map((item:IProduct)=>(item?.quantity * item?.attributes.price))
    console.log(price);

    const showIn = {
        show:{
            opacity:1,
            x:0,
            transition:{
                duration:0.2,
                type:"spring",
                stifness:200,
                damping:15
            }
        },
        hidden:{
            opacity:0,
            x:"100%",
            
        }
    }

    const cards = {
        hidden:{
            opacity:0
        },
        show:{
            opacity:1,
            transition:{
                delayChildren:0.5,
                staggerChildren:0.2
            }
        }
    }

    const scaleIn = {
        hidden:{
            scale:0,
        },
        show:{
            scale:1,
            transition:{
                delay:0.5
            }
        }

    }

    const animateInCart = {
        hidden:{
            scale:0,
            opacity:0,
        },
        show:{
            scale:1,
            opacity:1,
          
        },

    }

    //payment

    const handleCheckout = async()=>{
        const stripe = await getStripe();
        const res = await fetch("/api/stripe",{
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cartItems),
            method:"POST"
        });

        console.log(res)
        const data = await res.json();
        console.log(data?.id)
        await stripe.redirectToCheckout({ sessionId:data?.id })
    }

  return (



  
    <motion.aside variants={showIn} animate="show" initial="hidden" exit="hidden" className='min-h-screen bg-neutral-700 fixed top-0 right-0 min-w-[30vw] p-4 z-50 text-white' onClick={(e)=>e.stopPropagation()}>
        {cartItems && (
            <>
                   {cartItems.length === 0 ? (
                <div className='grid place-items-center h-screen'>
                    <motion.div variants={scaleIn} initial="hidden" animate="show" className="flex flex-col items-center">
                        <IoCart className="text-8xl" />
                        <h1>You have no carts yet. Let's shop!</h1>
                    </motion.div>
             
                </div>
            ):(
                <div>
                <h1 className='text-xl font-bold'>Shopping lists</h1>
                <motion.div layout variants={cards} animate="show" initial="hidden" className='space-y-3 flex justify-between flex-col mt-4'>
                    {cartItems?.map((item:IProduct)=>(
                        <motion.div layout variants={animateInCart}  key={uuidv4()} className='flex gap-x-3 p-2 bg-stone-300 text-stone-700 '>
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
                        </motion.div>
                    ))}
                </motion.div>
                <p className='mt-2'>Total: ${price.reduce((acc:any,cur:any)=>acc + cur,0)}</p>
            
                <button className='rounded-sm w-full bg-emerald-500 px-4 py-2 mt-4' onClick={handleCheckout}>Purchase</button>
                </div>

    )}
            </>
     
        )}
  
    </motion.aside>

    
  )
}

export default Cart