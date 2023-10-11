import * as z from "zod";

export const EditWishListFormSchema = z.object({
	wishlist_name: z.string({
		required_error: "Please enter a wishlist name.",
	}),
});

export const AddWishListFormSchema = z.object({
	wishlist_name: z.string({
		required_error: "Please enter a wishlist name.",
	}),
    wishlist_description: z.string({
        required_error: "Please enter a wishlist description.",
    })
});
