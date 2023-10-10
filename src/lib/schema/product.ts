import * as z from "zod";

export const AddProductFormSchema = z.object({
	product_name: z.string({
		required_error: "Please enter a product name.",
	}),
	price: z.string({
		required_error: "Please enter a price.",
	}),
	description: z.string({
		required_error: "Please enter a description.",
	}),
	wishlist: z
		.string({
			required_error: "Please select a wishlist.",
		})
		.optional(),
});
