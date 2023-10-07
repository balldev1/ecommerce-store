'use client'

import { MouseEventHandler } from 'react';

import { Product } from "@/types";
import Image from "next/image";
import { Expand } from 'lucide-react'
import { ShoppingCart } from 'lucide-react';

import Currency from "@/components/ui/currency";
import IconButton from '@/components/ui/icon-button';
import { useRouter } from "next/navigation";

import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';


interface ProductProps {
    data: Product;
}

const ProductCard: React.FC<ProductProps> = ({ data }) => {

    // hook zustand
    const cart = useCart();
    const previewModal = usePreviewModal()

    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    // MouseEventHandler ใช้เพื่อจัดการกับเหตุการณ์ที่เกิดขึ้นเมื่อมีการคลิกที่ปุ่ม
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation(); // ทำให้ เหตุการณ์อื่นที่ไม่ถูกคลิกทำงาน ทำงานเฉพาะที่คลิก

        previewModal.onOpen(data); // คลิก แล้ว เอา data ใส่ zustand
    }

    // add to cart
    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation(); // ทำให้ เหตุการณ์อื่นที่ไม่ถูกคลิกทำงาน ทำงานเฉพาะที่คลิก

        cart.addItem(data);
    }

    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* { Images and Actions } */}
            {/* {aspect-square สีเหลี่ยมมล} */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    fill
                    alt='Image'
                    src={data?.images?.[0].url}
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100
                 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600" />}
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* { description } */}
            <div>
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p>
                    {data.category?.name}
                </p>
            </div>
            {/* {Price} */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
    )
}

export default ProductCard