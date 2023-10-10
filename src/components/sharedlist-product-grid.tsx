import { WishlistWithProducts } from "@/types";
import AddProduct from "./actions/product/add-product";
import AddResourceCard from "./add-resource-card";
import ProductCard from "./product-card";

interface SharedlistProductGridProps {
    wishlist: WishlistWithProducts
}
const SharedlistProductGrid = (props: SharedlistProductGridProps) => {
    const { wishlist } = props;
    
    return (
        <div className="container mt-8 ">
            <div className="grid gap-8 sm:grid-cols-2  lg:grid-cols-3 ">
                {wishlist.products?.map((product) => (
                    <ProductCard product={product} key={product.product_code} />
                ))}
            </div>
        </div >
    )
}

export default SharedlistProductGrid