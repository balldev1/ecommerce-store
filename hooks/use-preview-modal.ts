import { create } from 'zustand';

import { Product } from '@/types';

// โครงสร้าง
interface PreviewModalStore {
    isOpen: boolean;
    data?: Product;
    onOpen: (data: Product) => void; // => รับข้อมูล data เข้ามา รูปแบบ type product เป็นฟังชั่น void
    onClose: () => void;
}

//create โครงสร้างตั้งต้น
const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false, // => เปิดปิด
    data: undefined, // => เก็บข้อมูลใน modal
    onOpen: (data: Product) => set({ data, isOpen: true }),  // =>รับ data และเปิด modal
    onClose: () => set({ isOpen: false }) // => ปิด modal
}));

export default usePreviewModal;