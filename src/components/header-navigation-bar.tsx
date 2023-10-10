import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { NavigationLinks } from "./navigation-link-container";
import { Input } from "./ui/input";
import { redirect } from "next/navigation";
import { getInitials } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { siteConfig } from "@/config/site";


const HeaderNavigationBar = () => {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!isAuthenticated()) {
        redirect('/')
    }

    const user = getUser()

    return (
        <nav className="container py-5 mx-auto lg:flex lg:justify-between lg:items-center">
            <div className="flex items-center justify-between">
                <Link href="/" className="text-3xl font-bold text-blue-600">
                    {siteConfig.name}
                </Link>
            </div>
            <div
                className="absolute inset-x-0 z-20 w-full px-6 gap-x-10 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                <NavigationLinks />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src={user.picture ?? undefined} />
                            <AvatarFallback>{getInitials(user?.given_name, user?.family_name)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LogoutLink>Logout</LogoutLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <h3 className="mx-2 text-gray-700 lg:hidden">Proximity</h3>
            </div>
        </nav >
    );
}

export default HeaderNavigationBar;