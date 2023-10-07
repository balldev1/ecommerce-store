'use client'

import PreviewModal from '@/components/ui/preview-modal'
import React, { useEffect, useState } from 'react'

// ใช้ isMounted เพือให้ components โหลดเสร็จก่อนถึงจะแสดงผล
const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PreviewModal />
        </>
    )
}

export default ModalProvider