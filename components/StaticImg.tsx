import Image from 'next/image'
import React from 'react'

interface ImgProps {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export const StaticImg: React.FC<ImgProps> = ({ src, alt, width, height }) => {
    return (
        <Image src={src} alt={alt} width={width} height={height} priority={true} />
    )
}
