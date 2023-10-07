'use client'
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';


import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';

const Summary = () => {

    // { value Params}
    const searchParams = useSearchParams();

    // { zustand }
    const items = useCart((state) => state.items);
    const reMoveAll = useCart((state) => state.removeAll);

    // console.log(items)

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success('Payment completed');
            reMoveAll();
        }

        if (searchParams.get('canceled')) {
            toast.error('Something went wrong.')
        }
    }, [searchParams, reMoveAll]) // ถ้า  searchParams , reMoveAll มีการเปลี่ยนแปลงให้ อัพเดทค่าใหม่ทุกครั้ง

    // ผลรวม price
    // ค่าเริ่ม total = 0 / Number = item.price 
    // เช่น item.price[3] => 0 + 100 + 200 + 300 = 600
    // tatalPrice => 600 ;
    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    }, 0);

    // api env/checkout => productId = items.id ทั้งหมดที่อยู่ใน cart
    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id),
        });

        window.location = response.data.url
    }

    return (
        <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>
                Order
            </h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <div className='text-base font-medium text-gray-900'>
                        Order total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button disabled={items.length === 0} onClick={onCheckout}
                className='w-full mt-6'>
                Checkout
            </Button>
        </div>
    )
}

export default Summary