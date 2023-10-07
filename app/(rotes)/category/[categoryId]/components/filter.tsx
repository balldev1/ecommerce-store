'use client'

import React from 'react'
import { Color, Size } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utills';
// qs
// Parsing query string to object
// const queryString = 'color=red&size=large';
// const parsedObject = qs.parse(queryString);
// console.log(parsedObject); // { color: 'red', size: 'large' }

// // Stringifying object to query string
// const stringifiedQuery = qs.stringify(parsedObject);
// console.log(stringifiedQuery); // 'color=red&size=large'

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
    // console.log(data);
    const searchParams = useSearchParams(); // => รับค่า search params => valuekey()
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey); // => get => ค่าของ valueKey sizeId => c4c180fa-3c13-43cd-ba26-775c8f682246

    // click => get(id)
    const onClick = (id: string) => {

        const current = qs.parse(searchParams.toString());  // => valueKey => sizeId

        // จะได้ valuekey sizeId , id === fitter.id 
        // [valueKey]: id คือ object นี้ {'sizeId' : มีค่า 'id'}
        const query = {
            ...current, // => sizeId
            [valueKey]: id // => valueKey === sizeId , id === filter.id
        };

        // ตรวจสอบว่า current มีค่า === id ถ้ามี ให้ return null
        // ?sizeId=c4c180fa-3c13-43cd-ba26-775c8f682246
        // null
        if (current[valueKey] === id) {
            query[valueKey] = null;
        }


        // http://localhost:3001/category/8c8c33ad-d5dc-4519-9a3f-56dfcd91c8de =>url,id => ?sizeId=c4c180fa-3c13-43cd-ba26-775c8f682246
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true }); // =>เพื่อให้ไม่รวมค่าที่เป็น null ในการสร้าง URL. เช่น color : 'null' ก็จะไม่เอามารวม url

        router.push(url) // => เปลี่ยนเส้นทางให้ไปหน้า url https://local3000.com/?color=blue&size=large
    }

    return (
        <div className='mb-8'>
            <h3 className='text-lg font-semibold'>
                {name}
            </h3>
            <hr className='my-4' />
            <div className='flex flex-wrap gap-2'>
                {data.map((filter) => (
                    <div key={filter.id} className='flex items-center'>
                        <Button // ส่งค่า ...props ไป url
                            onClick={() => onClick(filter.id)}
                            className={cn('rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                                //sizeId=c4c180fa-3c13-43cd-ba26-775c8f682246 === c4c180fa-3c13-43cd-ba26-775c8f682246
                                selectedValue === filter.id && 'bg-black text-white'
                            )}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Filter