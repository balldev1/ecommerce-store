import React from 'react'
import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utills';
import { Image as ImageType } from '@/types';

interface GalleryProps {
    image: ImageType
}

const GalleryTab: React.FC<GalleryProps> = ({ image }) => {
    return (
        <Tab className='relative flex aspect-square cursor-pointer
        items-center justify-center rounded-md bg-white
        '>
            {({ selected }) => (
                <div>
                    <span className='absolute aspect-square h-full w-full 
                    inset-0 overflow-hidden rounded-md'>
                        <Image
                            fill
                            alt=''
                            src={image.url}
                            className='object-cover object-center'
                        />
                    </span>
                    <span className={cn('absolute inset-0 rounded-md ring-2 ring-offset-2',
                        selected ? 'ring-black' : 'ring-transparent')} />
                </div>
            )}
        </Tab>
    )
}

export default GalleryTab