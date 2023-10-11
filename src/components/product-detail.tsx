import { Product } from "@/types"
import Image from "next/image"
import { Button } from "./ui/button"
import { Heart } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface ProductDetailProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product
}

const ProductDetail = (props: ProductDetailProps) => {
    const { product } = props

    return (
        <div className="py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-lg bg-gray-100">
                            <Image
                                src={product.image_url}
                                width={600}
                                height={700}
                                loading="lazy"
                                alt="Photo by Himanshu Dewangan"
                                className="h-full w-full object-cover object-center"
                            />
                            {product.is_acquired ? (
                                <span className="absolute left-0 top-0 rounded-br-lg bg-green-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                                    acquired
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                                {product.name}
                            </h2>
                        </div>

                        <div className="flex gap-2.5">
                            <Button size={"lg"}>Request to purchase</Button>

                            <Button
                                size={"icon"}
                                className="h-11 w-14 "
                                variant={"outline"}
                            >
                                <Heart className="h-6 w-6" />
                            </Button>
                        </div>

                        <div className="mb-4 mt-10">
                            <div className="flex items-end gap-2">
                                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                                    {formatPrice(product.price)} USD
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 md:mt-16 lg:mt-16">
                            <div className="mb-3 text-lg font-semibold text-gray-800">
                                Description
                            </div>

                            <p className="text-gray-500">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail