import { Size } from "@/types";

// ดึงข้อมูล จาก  api admin
const getSizes = async (): Promise<Size[]> => {
    // caching เมือ fetch เกิดการเก็บข้อมูลไว้ จึงต้องมี =>randomQueryParam
    // randomQueryParam ป้องกันการ caching
    // Math.random() เพื่อสร้างค่า random string แล้วเพิ่มเป็น query parameter ใน URL:
    const randomQueryParam = `random=${Math.random()}`;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes?${randomQueryParam}`;
    const res = await fetch(URL);
    return res.json();
}

export default getSizes;


// รับข้อมูลจาก api env
//  Promise<Category[]> คือ รูปแบบ type ข้อมูลที่รับ
// fetch ข้อมูล url === env
// => env/categories