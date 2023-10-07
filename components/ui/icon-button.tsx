import { cn } from "@/lib/utills"
import { MouseEventHandler } from 'react'

interface IconButtonProps {
    // รับคุณสมบัติของ react เมือเกิดเหตุการณ์ เอาเมาส์ไปคลิก
    // onClick, onMouseDown, onMouseUp, onMouseMove, และอื่นๆ.
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined; // มีค่าหรือ ไม่มี มีค่าหรือไม่มีค่าก็ได้
    icon: React.ReactElement;
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, className }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
                , className
            )}
        >
            {icon}
        </div>
    )
}

export default IconButton