import { BreadcrumbItem } from "@/types";

export interface ProductConfig {
	breadcrumbs: BreadcrumbItem[];
}
export const productConfig = {
	breadcrumbs: [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "Product",
			url: "/product",
		},
	],
};
