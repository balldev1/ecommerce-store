'use client'

import react, { useState, useEffect } from 'react';
// ฟั่นชั่นจัดรูปแบบสกุลเงิน
export const formatter = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD'
})

interface CurrencyProps {
    value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    })

    if (!isMounted) {
        return null;
    }

    return (
        <div className='font-semibold'>
            {/* / format Usd/ */}
            {formatter.format(Number(value))}
        </div>
    )
}

export default Currency