import React from 'react'
import { StaticImg } from '../StaticImg'
import Link from 'next/link'

interface ProductType {
    id: string;
    title: string;
    price: string;
    image: string;
}

export const Product: React.FC<ProductType> = ({ id, title, price, image }) => {
    return (
        <Link href={`/${id}`} className='w-[258px] inline-block'>
            <div className='bg-[#fbfbfb] pt-[31px] pb-[18px]'>
                <StaticImg src={image} alt='Product img' width={250} height={250} />
            </div>
            <h2 className='text-[16px] leading-[16px] text-[#3d3d3d] mt-[12px] mb-[6px]'>{title}</h2>
            <span className='text-[#46a358] text-[18px] leading-[16px] font-bold'>{price}</span>
        </Link>
    )
}

