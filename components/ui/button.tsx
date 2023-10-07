// คือ รับค่าจาก components หนึ่งไปใช้ อีกคอม components หนึ่ง
// เช่น  components1 <div ref={ref}> จาก 
// ไปใช้  components2    const yourRef = useRef(); =>  <YourComponent ref={yourRef}>
import { cn } from '@/lib/utills';
import { forwardRef } from 'react'

// interface คุณสมบัติของ react 
// ให้ Button รับคุณสมบัติทั้งหมดของ HTML button element
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

// รับคุณสมบัติ react <HTMLButtonElement, ButtonProps>
// ref รับค่าต่างๆ  {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    return (
        <button
            disabled={disabled}
            ref={ref}
            {...props}
            className={cn(`
            w-auto rounded-full bg-black  border-transparent px-5 py-3 
            disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold
            hover:opacity-75 transition
            `, className
            )}
        >
            {children}
        </button>
    )
});

// กำหนดชื่อที่ใช้แสดงของคอมโพนี้เป็น "Button"
Button.displayName = "Button";

export default Button;

// disabled:cursor-not-allowed: ใช้เพื่อเปลี่ยนรูปร่างของเคอร์เซอร์เป็น not-allowed ทำให้เหมือนกับไม่สามารถใช้งาน (cursor not allowed) หรือไม่สามารถคลิกได้.

// disabled:opacity-50: ใช้เพื่อลดความโปร่งใสของอิลิเมนต์หรือองค์ประกอบเป็น 50% ทำให้องค์ประกอบดูเบลอขึ้นเมื่อถูกปิดใช้งาน.