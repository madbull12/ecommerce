import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoMdCart } from 'react-icons/io'
import { IProduct } from '../interface'
import { useShopContext } from '../lib/context'


interface IProps {
    product:IProduct
}
const Product = ({ product }:IProps) => {
    const { title,price,image,slug } = product.attributes;
    const { addToCart } = useShopContext();

  return (
    <Link href={`/product/${slug}`}>
      <article className='p-4 shadow-sm flex flex-col cursor-pointer space-y-3 text-white bg-neutral-700 rounded-lg '>



      <Image src={image.data.attributes.formats.small.url} width={200} height={200} objectFit="cover" alt={title} />
        <p className='text-xl font-semibold'>{title}</p>
        <p className='text-sm'>${price.toLocaleString()}</p>
        <button 
          onClick={(e)=>{
            e.stopPropagation();
            addToCart(product,1);
          }}  
          className='hover:text-emerald-500 font-bold self-start flex gap-x-2 items-center  px-4 py-2 rounded-lg duration-150 ease-in-out border-b border-gray-400 group hover:border-emerald-500 '
        >
            <IoMdCart className="group-hover:animate-bounce" />
            Add to cart
        </button>




      </article>
    </Link>

  )
}

export default Product