'use client'

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ProductImages = ( { images } : { images: string[] }) => {
    const [current, setCurrent] = useState(0);

    return (
        <div className="space-y-4">
            <Image 
                src={images[current]} 
                alt="product image" 
                width={1000} 
                height={1000} 
                className="min-h-[300px]"
                object-cover="true"
                object-center="true" />
            <div className="flex">
                { images.map((image, idx) => (
                    <div 
                        key={image} 
                        onClick={ () => setCurrent(idx) }
                        className={cn('border mr-2 cursor-pointer hover:border-orange-600', current === idx && 'border-orange-300')}>
                        <Image 
                            src={image} 
                            alt="image"
                            width={100}
                            height={100}
                            object-cover="true"
                            object-center="true" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductImages;