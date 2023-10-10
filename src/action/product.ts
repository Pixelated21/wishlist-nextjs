"use server";

import { AddProductFormSchema } from "@/lib/schema/product";
import { EditWishListFormSchema } from "@/lib/schema/wishlist";
import { Product, WishList } from "@/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function getProductAction(product_code: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/products/${product_code}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/vnd.api+json",
					Accept: "application/vnd.api+json",
				},
			}
		);

		if (!response.ok) {
			console.log(response.status);

			console.log(response);
			if (response.status == 404) {
				return null;
			}

			return null;
		}
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

export async function getProductsAction() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/products`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/vnd.api+json",
					Accept: "application/vnd.api+json",
				},
			}
		);

		if (!response.ok) {
			console.log(response.status);

			console.log(response);
			if (response.status == 404) {
				return null;
			}

			return null;
		}
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

export async function addProductAction(
	data: z.infer<typeof AddProductFormSchema>,
	wishlist_code: string
) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/products`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/vnd.api+json",
					Accept: "application/vnd.api+json",
				},
				body: JSON.stringify({
					name: data.product_name,
					price: data.price,
					description: data.description,
					wishlist_code: wishlist_code,
				}),
			}
		);

		if (!response.ok) {
			console.log(response.status);

			if (response.status == 404) {
				return null;
			}

			return null;
		}
		revalidatePath(`/wishlist/${wishlist_code}`);
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

export async function editProductAction(
	data: z.infer<typeof EditWishListFormSchema>,
	wishlist: WishList
) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/wishlists/${wishlist.wishlist_code}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/vnd.api+json",
					Accept: "application/vnd.api+json",
				},
				body: JSON.stringify({
					name: data.wishlist_name,
					description: wishlist.description ?? null,
				}),
			}
		);

		if (!response.ok) {
			console.log(response.status);

			console.log(response);
			if (response.status == 404) {
				return null;
			}

			return null;
		}
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

export async function deleteProductAction(product: Product) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${product.product_code}}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/vnd.api+json",
					Accept: "application/vnd.api+json",
				},
			}
		);

		if (!response.ok) {
			console.log(response.status);

			console.log(response);
			if (response.status == 404) {
				return null;
			}

			return null;
		}
		revalidatePath("/admin/courses");
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}
