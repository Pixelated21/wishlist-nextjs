"use server";

import {
	AddWishListFormSchema,
	EditWishListFormSchema,
} from "@/lib/validations/wishlist";
import { WishList } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { get } from "http";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function getWishListAction(wishlist_code: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/wishlists/${wishlist_code}`,
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

export async function getWishListsAction(user_id: string) {
	try {
		const params = new URLSearchParams({ user_id: user_id });

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/wishlists?${params.toString()}`,
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

export async function addWishListAction(
	data: z.infer<typeof AddWishListFormSchema>
) {
	try {
		const { getUser } = getKindeServerSession();

		const user = getUser();
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/wishlists`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/vnd.api+json",
					Accept: "application/vnd.api+json",
				},
				body: JSON.stringify({
					name: data.wishlist_name,
					description: data.wishlist_name ?? null,
					user_id: user.id,
				}),
			}
		);

		if (!response.ok) {
			console.log(response.status);
			console.log(await response.json());

			if (response.status == 404) {
				return null;
			}

			return null;
		}
		revalidatePath("/profile");
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

export async function editWishListAction(
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
		revalidatePath("/profile");
		revalidatePath(`/wishlist/${wishlist.wishlist_code}`);
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

export async function deleteWishListAction(wishlist: WishList) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/wishlists/${wishlist.wishlist_code}`,
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
		revalidatePath("/profile");
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}
