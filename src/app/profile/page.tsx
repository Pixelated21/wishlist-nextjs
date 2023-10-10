import { getWishListsAction } from "@/action/wishlist"
import Breadcrumb from "@/components/breadcrumb"
import MinScreenLayout from "@/components/min-screen-layout"
import SecondaryNav from "@/components/secondary-nav"
import WishlistGrid from "@/components/wishlist-grid"
import { profileConfig } from "@/config/profile"
import { WishlistWithProducts, WithWrapper } from "@/types"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const ProfilePage = async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser()

    if (!user?.id) {
        redirect('/')
    }

    const getWishlists = getWishListsAction(user.id)
    const [wishlists]: [WithWrapper<WishlistWithProducts[]>] = await Promise.all([getWishlists])

    return (
        <MinScreenLayout>
            <Breadcrumb breadcrumbs={profileConfig.breadcrumbs} />
            <SecondaryNav wishlists={wishlists?.data} user={user} />
            <WishlistGrid wishlists={wishlists?.data} />
        </MinScreenLayout >
    )
}

export default ProfilePage