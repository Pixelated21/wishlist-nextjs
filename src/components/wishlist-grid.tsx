import { WishList, WishlistWithProducts } from "@/types";
import AddResourceCard from "./add-resource-card"
import WishlistCard from "./wishlist-card";
import Link from "next/link";
import AddWishlist from "./actions/wishlist/add-wishlist";

interface WishlistGridProps {
    wishlists: WishlistWithProducts[]
}
const WishlistGrid = (props: WishlistGridProps) => {
    const { wishlists } = props;
    return (
        <div className="container mt-8">
            <div className="grid gap-8 sm:grid-cols-2  lg:grid-cols-3 ">
                <AddWishlist>
                    <AddResourceCard title="Add Wishlist" />
                </AddWishlist>
                {wishlists?.map((wishlist) => (
                    <WishlistCard wishlist={wishlist} key={wishlist.wishlist_code} />
                ))}
            </div>
        </div >
    )
}

export default WishlistGrid