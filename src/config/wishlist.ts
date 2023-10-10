import { BreadcrumbItem } from "@/types";

export interface WishlistConfig {
	breadcrumbs: BreadcrumbItem[];
}
export const wishlistConfig = {
	breadcrumbs: [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "Profile",
			url: "/profile",
		},
	],
};
