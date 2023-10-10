import { BreadcrumbItem } from "@/types";

export interface SharedListConfig {
	breadcrumbs: BreadcrumbItem[];
}
export const sharedListConfig = {
	breadcrumbs: [
		{
			name: "Home",
			url: "/",
		},
	],
};
