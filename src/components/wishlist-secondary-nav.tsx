import { cn } from "@/lib/utils"
import { WishlistWithProducts } from "@/types"
import Image from "next/image"
import AddProduct from "./actions/product/add-product"
import { RemoveWishlist } from "./actions/wishlist/delete-wishlist"
import EditWatchListName from "./actions/wishlist/edit-wishlist-name"
import { Button } from "./ui/button"
import CopyButton from "./actions/copy-text"
import { PencilIcon } from "lucide-react"
import { UploadButton } from "@/utils/uploadthing"
import UploadButtonContainer from "./upload-button"

interface WishlistSecondaryNavProps extends React.HTMLAttributes<HTMLElement> {
    wishlist: WishlistWithProducts
}
const WishlistSecondaryNav = (props: WishlistSecondaryNavProps) => {
    const { className, wishlist } = props;
    const acquiredProductsCount = wishlist?.products?.filter(product => product.is_acquired).length ?? 0

    return (
        <section className={cn("h-72 container py-5 mt-5", className)}>
            <div className="h-full w-full flex flex-row justify-between">
                <div className="flex w-full gap-4">
                    <div className="relative ">
                        <div className="absolute top-2 left-2 z-10">
                            <UploadButtonContainer />
                            <Button className="rounded-full text-white group" variant={'ghost'} size={'icon'}> <PencilIcon className="h-5 w-5 text-white group-hover:text-gray-500" /> </Button>
                        </div>
                        <div className="h-full w-72 rounded-md relative overflow-hidden">
                            <Image src="https://utfs.io/f/1e143b0c-e35b-4933-9fdd-fdfd60c97177-f9dh9n.jpg" className="object-cover absolute" alt="Picture of the author" width={1920} height={2401} />
                        </div>
                    </div>


                    <EditWatchListName wishlist={wishlist} />

                    <div className="flex-1 flex-col h-full flex items-end ">
                        <div className="flex justify-end gap-x-3 max-w-fit  py-2 px-2 rounded-md bg-gray-50 border border-gray-200 ">
                            <AddProduct wishlist={wishlist}>
                                <Button variant={'default'}>Add Product</Button>
                            </AddProduct>
                            <RemoveWishlist wishlist={wishlist}>
                                <Button variant={'outline'}>Remove List</Button>
                            </RemoveWishlist>
                            <CopyButton textToCopy={`${process.env.NEXT_PUBLIC_APP_URL}/sharedlist/${wishlist.wishlist_code}`} />
                        </div>
                        <div className=" flex flex-col items-end justify-end flex-1 gap-y-3 ">
                            <div className="text-2xl font-semibold flex gap-x-2"><span>Acquired:</span><span>{acquiredProductsCount}</span></div>
                            <div className="text-2xl font-semibold flex gap-x-2"><span>Total Products:</span><span>{wishlist.products.length}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WishlistSecondaryNav