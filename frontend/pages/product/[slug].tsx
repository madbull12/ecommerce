import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { IoIosAddCircle } from 'react-icons/io';
import { useQuery } from 'urql'
import { GET_SINGLE_PRODUCT } from '../../lib/query';
import { AiFillMinusCircle } from 'react-icons/ai'
import { useShopContext } from '../../lib/context';

const ProductDetailsPage = () => {
    const router = useRouter();
    const { increaseQty,decreaseQty,qty,cartItems,addToCart,disableCart } = useShopContext();
    const { slug } = router.query;
    const [results] = useQuery({
        query:GET_SINGLE_PRODUCT,
        variables:{slug:slug}
    });

    const { data,fetching,error } = results;

    if(fetching) return <p>Loading...</p>
    if(error) return <p>Theres an error</p>
    console.log(data)
    const { data:product } = data?.products
    const { title,image,description } = product[0]?.attributes || {};
    
    
    
  return (
    <main className='max-w-7xl mx-auto min-h-screen text-white  p-2'>
        <div className='flex gap-y-4 flex-col md:flex-row md:gap-x-2 justify-around'>
            <Image  src={image?.data.attributes.formats.medium.url} alt={title} width={350} height={400} objectFit="cover" />
            <div className='space-y-3'>
                <p className='text-base md:text-lg font-semibold'>{title}</p>
                <p className='text-gray-300 text-sm md:text-base'>{description}</p>
                {/* <div className='flex items-center mt-4 gap-x-3 text-sm mb-4' >
                    <p>Quantity</p>
                    <div className='flex gap-x-3 items-center text-emerald-500 '>
                        <IoIosAddCircle className='cursor-pointer hover:text-emerald-400' onClick={increaseQty} />
                        <span className='text-white'>{qty}</span>
                        <AiFillMinusCircle className='cursor-pointer hover:text-emerald-400' onClick={decreaseQty} />
                        
                    </div>
                </div> */}
                <button className='bg-emerald-500 font-semibold px-4 py-1 rounded-sm w-full disabled:cursor-not-allowed' disabled={disableCart} onClick={()=>addToCart(product[0],qty)}>Add to Cart</button>

            </div>
        </div>
    </main>
  )
}

export default ProductDetailsPage