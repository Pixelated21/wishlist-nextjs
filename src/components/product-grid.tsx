import { WishlistWithProducts } from "@/types";
import AddProduct from "./actions/product/add-product";
import AddResourceCard from "./add-resource-card";
import ProductCard from "./product-card";
import { cn } from "@/lib/utils";
import React from "react";

interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
    wishlist: WishlistWithProducts,
}

const ProductGrid = (props: ProductGridProps) => {
    const { wishlist, className } = props;

    return (
        <div className={cn("container mt-8", className)}>
            <div className="grid gap-8 sm:grid-cols-2  lg:grid-cols-3 ">
                {wishlist.products?.length <= 0 ? (
                    <AddProduct wishlist={wishlist}>
                        <AddResourceCard title="Add Product" />
                    </AddProduct>
                ) : null}
                {wishlist.products?.map((product) => (
                    <ProductCard product={product} key={product.product_code} />
                ))}
            </div>
        </div >
    )
}

export default ProductGrid