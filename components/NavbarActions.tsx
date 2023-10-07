'use client';

import react, { useState, useEffect } from 'react';
import { ShoppingBag } from "lucide-react";
import { useRouter } from 'next/navigation';

import Button from "@/components/ui/button";
import useCart from '@/hooks/use-cart';

const NavbarActions = () => {

    // isMounted ให้ components นี้โหลดเสร็จก่อนถึงจะแสดงข้อมูลใน components
    // ใช้สำหรับ ข้อมูลที่มีการเปลี่ยนแปลง
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();
    // console.log(cart);
    if (!isMounted) {
        return null;
    }

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button onClick={() => router.push('/cart')}
                className="flex items-center rounded-full bg-black px-4 py-2">
                {/* {icon} */}
                <ShoppingBag
                    size={20}
                    color='white'
                />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    )
}

export default NavbarActions;