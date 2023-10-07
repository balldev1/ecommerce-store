import { Product } from "@/types";
import qs from 'query-string';
// qs
// Parsing query string to object
// const queryString = 'color=red&size=large';
// const parsedObject = qs.parse(queryString);
// console.log(parsedObject); // { color: 'red', size: 'large' }

// // Stringifying object to query string
// const queryString = 'color=red&size=large';
// const stringifiedQuery = qs.stringify(parsedObject);
// console.log(stringifiedQuery); // 'color=red&size=large'

// type จาก product ...Id
interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

// แปลงค่า value ที่ได้มาเป้น object เพือใช้งาน
// ดึงข้อมูล จาก  api admin (query)
const getProducts = async (query: Query): Promise<Product[]> => {

    // API URL
    // caching เมือ fetch เกิดการเก็บข้อมูลไว้ จึงต้องมี =>randomQueryParam
    // randomQueryParam ป้องกันการ caching
    // Math.random() เพื่อสร้างค่า random string แล้วเพิ่มเป็น query parameter ใน URL:
    const randomQueryParam = `random=${Math.random()}`;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/products?${randomQueryParam}`;

    // ดึงค่า string url => url => Query.Product =>...Id
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured
        }
    })

    // fetch เพื่อทำการเรียก URL ที่ได้จากการใช้ qs.stringifyUrl
    //  และส่ง request ไปยัง URL นั้น. และ res.json() ใช้เพื่อแปลง response
    //   ที่ได้เป็น JSON และส่งกลับเป็น object ที่ใช้งานต่อไป.
    const res = await fetch(url);

    return res.json();

}

export default getProducts;


// รับข้อมูลจาก api env
//  Promise<Category[]> คือ รูปแบบ type ข้อมูลที่รับ
// fetch ข้อมูล url === env
// => env/categories