import { Billboard, Product } from "@/types";



// ดึงข้อมูล จาก  api admin
const getProduct = async (id: string): Promise<Product> => {

    // caching เมือ fetch เกิดการเก็บข้อมูลไว้ จึงต้องมี =>randomQueryParam
    // randomQueryParam ป้องกันการ caching
    // Math.random() เพื่อสร้างค่า random string แล้วเพิ่มเป็น query parameter ใน URL:
    const randomQueryParam = `random=${Math.random()}`;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}${randomQueryParam}/products`;
    const res = await fetch(`${URL}/${id}`); // => URL.id ที่รับเข้ามา
    return res.json();

}

export default getProduct;


// รับข้อมูลจาก api env
//  Promise<Category[]> คือ รูปแบบ type ข้อมูลที่รับ
// fetch ข้อมูล url === env
// => env/categories