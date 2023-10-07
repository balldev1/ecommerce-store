import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // ตัวกลางเก็บค่า
// create ใช้สำหรับสร้าง state store ใน zustand.
// persist เป็น middleware ที่ทำให้ state ยังอยู่ ตลอดเวลาแม้หน้าเว็บจะโหลดใหม่ เก็บไว้ที่ JSONStorage
// createJSONStorage ที่เก็บ state.
// create สร้าง state => persist ค่าstate (หน้าเว็บโหลดใหม่ค่าstateก็ยังอยู่) =>  ที่เก็บ state storage แบบJsonStorage

import { Product } from '@/types';
import { toast } from 'react-hot-toast';

// โครงสร้าง
interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

//create โครงสร้างตั้งต้น
// create => persisit =>(set,get)
const useCart = create(persist<CartStore>((set, get) => ({
    items: [], // => กำหนด items []
    addItem: (data: Product) => { // =>additem(data)
        const curretItems = get().items; // => รับ data items ล่าสุด 
        const existingItems = curretItems.find((item) => item.id === data.id); // => ตรวจหา id.item === id ที่รับเข้ามา

        if (existingItems) { // => ถ้ามี id ซ้ำกัน ให้แจ้งว่าซ้ำกัน 
            return toast('Item already in cart.');
        }

        set({ items: [...get().items, data] }); // => ถ้าไม่ซ้ำกันให้สร้างarryใหม่ แล้วเอา data ที่ได้รับมากับที่มีอยู่แล้ว set เก็บไว้ที่ items
        toast.success('Item Added to cart.');
    },
    removeItem: (id: string) => { // รับ id เข้ามา แล้วกรอง ข้อมูลในitems ต้อง !== id ที่รับเข้ามาสร้าง [] ใหม่ ที่ไม่มี id ที่รับเข้ามา แล้ว set Item [] ใหม่
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success('Item removed from the cart.');
    },
    removeAll: () => set({ items: [] }), // => set items [] ลบทั้งหมด
}), {
    name: 'cart-storage', // ชือที่เก็บ storage
    storage: createJSONStorage(() => localStorage) // => ให้ข้อมูลเป็น JSON
})
)

export default useCart;