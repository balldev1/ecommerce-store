import { Billboard } from "@/types";

// ดึงข้อมูล จาก  api admin
const getBillboards = async (id: string): Promise<Billboard> => {

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;
    const res = await fetch(`${URL}/${id}`); // => URL.id ที่รับเข้ามา
    return res.json();

}

export default getBillboards;


// รับข้อมูลจาก api env
//  Promise<Category[]> คือ รูปแบบ type ข้อมูลที่รับ
// fetch ข้อมูล url === env
// => env/categories