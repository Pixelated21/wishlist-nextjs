import { getProductAction } from "@/action/product";
import Breadcrumb from "@/components/breadcrumb";
import MinScreenLayout from "@/components/min-screen-layout";
import ProductDetail from "@/components/product-detail";
import { profileConfig } from "@/config/profile";
import { ProductWithWishlist, WithWrapper } from "@/types";

interface ProductPageProps {
    params: {
        product_code: string;
    };
}


const ProductPage = async ({ params }: ProductPageProps) => {
    const { product_code } = params;
    const getProduct = getProductAction(product_code);
    const [product]: [WithWrapper<ProductWithWishlist>] = await Promise.all([getProduct]);
    const breadcrumbs = [
        ...profileConfig.breadcrumbs,
        {
            name: product.data?.wishlist?.name,
            url: `/wishlist/${product.data?.wishlist?.wishlist_code}`,
        },
        {
            name: product.data.name,
            url: `/product/${product.data.product_code}`,
        },
    ];

    return (
        <MinScreenLayout>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <ProductDetail product={product.data} />
        </MinScreenLayout>
    );
};

export default ProductPage;
