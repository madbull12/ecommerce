import Image from 'next/image'
import React from 'react'
import { IoMdCart } from 'react-icons/io'
import { IProduct } from '../interface'


interface IProps {
    product:IProduct
}
const Product = ({ product }:IProps) => {
    const { title,price,image  } = product.attributes;
    console.log(image)
  return (
    <article className='p-4 shadow-sm flex flex-col space-y-3 text-white bg-neutral-700 rounded-lg '>
        <Image src={image.data.attributes.formats.small.url} width={200} height={200} objectFit="cover" alt={title} />
        <p className='text-xl font-semibold'>{title}</p>
        <p className='text-sm'>${price.toLocaleString()}</p>
        <button className='hover:text-emerald-500 font-bold self-start flex gap-x-2 items-center  px-4 py-2 rounded-lg duration-150 ease-in-out border-b border-gray-400 group hover:border-emerald-500 '>
            <IoMdCart className="group-hover:animate-bounce" />
            Add to cart
        </button>
    </article>
  )
}

export default Product