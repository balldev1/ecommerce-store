import Billboard from '@/components/billboard';
import Container from '@/components/ui/container';
import React from 'react'

import getCategory from '@/actions/get-category';
import getColors from '@/actions/get-color';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-size';
import Filter from './components/filter';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import MobileFilters from './components/moblie-filters';

export const revalidate = 0;

interface CategoryPageProp {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }
}

const CategoryPage: React.FC<CategoryPageProp> = async ({ params, searchParams }) => {

    // รับ params | searhParams หาข้อมูล product
    const products = await getProducts({
        categoryId: params.categoryId,
        //?sizeId=c4c180fa-3c13-43cd-ba26-775c8f682246 => ใช้searh params id  c4c180fa-3c13-43cd-ba26-775c8f682246 => หาcolor ในฐานข้อมูล
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    });

    // api get size,colors,category
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId)

    // console.log(sizes)

    return (
        <div className='bg-white'>
            <Container>
                <Billboard data={category.billboard} />
                <div className='px-4 sm:px-6 lg:px-8 pb-24'>
                    <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
                        <MobileFilters sizes={sizes} colors={colors} />
                        {/* {Add Moblie Filters} */}
                        <div className='hidden lg:block'>
                            {/* { filter valuekey searh params} */}
                            <Filter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <Filter
                                valueKey="colorId"
                                name="Colors"
                                data={colors}
                            />
                        </div>
                        <div className='mt-6 lg:col-span-4 lg:mt-0'>
                            {/*  รับ params | searhParams หาข้อมูล productมาแสดง */}
                            {products.length === 0 && <NoResults />}
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {products.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CategoryPage