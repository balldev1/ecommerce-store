import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ProductList";
import Billboard from "@/components/billboard"
import Container from "@/components/ui/container"

export const revalidate = 0;

const HomePage = async () => {

    // get api => (query.string) => product
    const products = await getProducts({ isFeatured: true });
    // console.log(products)

    // get api => (id) => billboard
    const billboard = await getBillboards("aa0bf6a0-00bb-448c-b15f-f082ad1915b3");

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
            </div>
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <ProductList title="Featured Products" items={products} />
            </div>
        </Container>
    )
}

export default HomePage