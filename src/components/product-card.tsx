import { formatPrice } from "@/lib/utils"
import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
    product: Product
}
const ProductCard = (props: ProductCardProps) => {
    const { product } = props
    return (
        <Link href={`/product/${product.product_code}`} className="block rounded-lg p-2 hover:bg-gray-100 transition ease-in-out duration-300">
            <div style={{ backgroundImage: product.image_url }} className="flex overflow-hidden justify-center relative items-center h-56 w-full rounded-md bg-gray-300 hover:bg-slate-200 transition ease-in-out duration-1000">
                {product.image_url ? (<Image alt="product-image" className="absolute object-cover object-left h-full w-full" src={product.image_url} height={224} width={400} />) : (<h4 className="text-gray-500 text-2xl font-semibold">No Product Image</h4>)}
            </div>

            <div className="mt-2">
                <div className="font-semibold line-clamp-2">
                    {product.name}
                </div>

                <div className="text-sm text-gray-500 flex gap-x-2 items-center mt-1">
                    <span>Price:</span>
                    <span className="text-green-600">{formatPrice(product.price)} USD</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
