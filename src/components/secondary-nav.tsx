'use client'

import { cn, getInitials } from "@/lib/utils"
import { WishlistWithProducts } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface SecondaryNavProps {
    className?: string
    wishlists: WishlistWithProducts[]
    user: any
}

const SecondaryNav = (props: SecondaryNavProps) => {
    const { className, wishlists, user } = props

    return (
        <div className={cn("container px-6 py-16 mx-auto text-center", className)}>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-x-6 justify-center">
                    <div className="relative">
                        <Avatar className="h-32 w-32">
                            <AvatarImage src={user.picture ?? undefined} />
                            <AvatarFallback>{getInitials(user?.given_name, user?.family_name)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <h1 className="text-xl font-bold text-gray-800 lg:text-4xl mt-2">Proximity</h1>
            </div>
            <div className="flex items-center gap-x-2 text-gray-500 justify-center">
                {/* <span className="font-semibold text-blue-500">Following</span> */}
                {/* <span className="w-[4px] h-[4px] bg-gray-500 rounded-full"></span> */}
                <span>{wishlists?.length ?? 0} Wishlists</span>
            </div>
        </div>
    )
}

export default SecondaryNav