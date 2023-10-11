import { getWishListAction } from "@/action/wishlist"
import Breadcrumb from "@/components/breadcrumb"
import MinScreenLayout from "@/components/min-screen-layout"
import ProductGrid from "@/components/product-grid"
import WishlistSecondaryNav from "@/components/wishlist-secondary-nav"
import { wishlistConfig } from "@/config/wishlist"
import { BreadcrumbItem, WishlistWithProducts, WithWrapper } from "@/types"
import { notFound } from "next/navigation"

interface WishlistPageProps {
    params: {
        wishlist_code: string
    }
}

const WishlistPage = async ({ params }: WishlistPageProps) => {
    const { wishlist_code } = params
    const getWishlist = getWishListAction(wishlist_code)
    const [wishlist]: [WithWrapper<WishlistWithProducts>] = await Promise.all([getWishlist])

    if (!wishlist) {
        return notFound()
    }

    const breadcrumbs: BreadcrumbItem[] = [...wishlistConfig.breadcrumbs, { name: wishlist.data.name, url: `/wishlist/${wishlist.data.wishlist_code}` }]

    return (
        <MinScreenLayout>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <WishlistSecondaryNav wishlist={wishlist.data} />
            <ProductGrid className="mt-10" wishlist={wishlist.data} />
        </MinScreenLayout >
    )
}

export default WishlistPage