import { cn } from "@/lib/utils"
import { WishlistWithProducts } from "@/types"
import Image from "next/image"

interface SharedlistSecondaryNavProps {
    className?: string
    wishlist: WishlistWithProducts
}
const SharedlistSecondaryNav = (props: SharedlistSecondaryNavProps) => {
    const { className, wishlist } = props;
    const acquiredProductsCount = wishlist?.products?.filter(product => product.is_acquired).length ?? 0

    return (
        <section className={cn("h-72 container bg-white py-5 mt-5", className)}>
            <div className="h-full w-full flex flex-row justify-between">
                <div className="flex w-full gap-4">
                    <div className="h-full w-72 rounded-md relative overflow-hidden">
                        <Image src="https://utfs.io/f/1e143b0c-e35b-4933-9fdd-fdfd60c97177-f9dh9n.jpg" className="object-cover absolute" alt="Picture of the author" width={1920} height={2401} />
                    </div>
                    <div className="flex-1 flex-col h-full flex">
                        <div className="text-2xl h-10 font-semibold max-w-fit items-center flex gap-x-2">
                            <span>{wishlist.name}</span>
                        </div>
                        <div className=" flex flex-col items-end justify-end flex-1  gap-y-3 ">
                            <div className="text-2xl font-semibold flex gap-x-2"><span>Acquired:</span><span>{acquiredProductsCount}</span></div>
                            <div className="text-2xl font-semibold flex gap-x-2"><span>Total Products:</span><span>{wishlist.products.length}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SharedlistSecondaryNav