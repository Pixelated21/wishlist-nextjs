import { FileWithPath } from "react-dropzone";

export interface NavigationItem {
	name: string;
	url: string;
}

export type BreadcrumbItem = Omit<NavigationItem, "url"> & {
	url?: string;
};
export interface TabItem extends NavigationItem {}

export interface StatisticItem {
	name: string;
	value: string | number;
}

export interface WithWrapper<T> {
	data: T;
}

export interface WishList {
	wishlist_code: string;
	name: string;
	user_id: string;
	description: string;
	created_at: string;
	updated_at: string;
}

export interface WishlistWithProducts extends WishList {
	products: Product[];
}

export interface Product {
	product_code: string;
	price: number;
	id: number;
	name: string;
	description: string;
	image_url: string;
	is_acquired: number;
	created_at: string;
	updated_at: string;
}

export interface ProductWithWishlist extends Product {
	wishlist: WishList;
}

export type FileWithPreview = FileWithPath & {
	preview: string;
};

export interface StoredFile {
	id: string;
	name: string;
	url: string;
}
