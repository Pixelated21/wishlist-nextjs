import { BreadcrumbItem } from "@/types";

export interface ProfileConfig {
	breadcrumbs: BreadcrumbItem[];
}
export const profileConfig = {
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
