import { formatCurrency } from "@/lib/utils"
import { Product } from "@/types"
import Link from "next/link"

interface ProductCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
    product: Product
}
const ProductCard = (props: ProductCardProps) => {
    const { product } = props
    return (
        <Link href={`/product/${product.product_code}`} className="block rounded-lg hover:bg-gray-100 transition ease-in-out duration-300">
            <div style={{ backgroundImage: '' }} className="flex justify-center items-center h-56 w-full rounded-md bg-gray-300 hover:bg-slate-200 transition ease-in-out duration-1000">
                <h4 className="text-gray-500 text-2xl font-semibold">No Product Image</h4>
            </div>

            <div className="mt-2">
                <div className="font-semibold line-clamp-2">
                    {product.name}
                </div>

                <div className="text-sm text-gray-500 flex gap-x-2 items-center mt-1">
                    <span>Price:</span>
                    <span className="text-green-600">{formatCurrency(product.price)} USD</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
