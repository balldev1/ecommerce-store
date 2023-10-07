import { Category } from "@/types";

// ดึงข้อมูล จาก  api admin
const getCategories = async (): Promise<Category[]> => {
    // caching เมือ fetch เกิดการเก็บข้อมูลไว้ จึงต้องมี =>randomQueryParam
    // randomQueryParam ป้องกันการ caching
    // Math.random() เพื่อสร้างค่า random string แล้วเพิ่มเป็น query parameter ใน URL:
    const randomQueryParam = `random=${Math.random()}`;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories?${randomQueryParam}`;
    const res = await fetch(URL);
    return res.json();

}

export default getCategories;


// รับข้อมูลจาก api env
//  Promise<Category[]> คือ รูปแบบ type ข้อมูลที่รับ
// fetch ข้อมูล url === env
// => env/categories