import { getWishListAction } from "@/action/wishlist";
import Breadcrumb from "@/components/breadcrumb";
import MinScreenLayout from "@/components/min-screen-layout";
import SharedlistProductGrid from "@/components/sharedlist-product-grid";
import SharedlistSecondaryNav from "@/components/sharedlist-secondary-nav";
import { sharedListConfig } from "@/config/sharedlist";
import { BreadcrumbItem, WishlistWithProducts, WithWrapper } from "@/types";
import { notFound } from "next/navigation";

interface SharedListPageProps {
    params: {
        wishlist_code: string
    }
}
const SharedListPage = async ({ params }: SharedListPageProps) => {
    const { wishlist_code } = params
    const getWishlist = getWishListAction(wishlist_code)
    const [wishlist]: [WithWrapper<WishlistWithProducts>] = await Promise.all([getWishlist])

    if (!wishlist) {
        return notFound()
    }
    const breadcrumbs: BreadcrumbItem[] = [...sharedListConfig.breadcrumbs, { name: wishlist.data.name, url: `/sharedlist/${wishlist.data.wishlist_code}` }]

    return (
        <MinScreenLayout>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <SharedlistSecondaryNav wishlist={wishlist.data} />
            <SharedlistProductGrid wishlist={wishlist.data} />
        </MinScreenLayout >
    )
};
export default SharedListPage;
