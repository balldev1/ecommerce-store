import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// ฟันชั่น css cn
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}