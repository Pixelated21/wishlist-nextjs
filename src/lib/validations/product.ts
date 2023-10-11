import * as z from "zod";

export const productSchema = z.object({
	product_name: z.string({
		required_error: "Please enter a product name.",
	}),
	price: z.string({
		required_error: "Please enter a price.",
	}),
	description: z.string({
		required_error: "Please enter a description.",
	}),
	images: z
		.unknown()
		.refine((val) => {
			if (!Array.isArray(val)) return false;
			if (val.some((file) => !(file instanceof File))) return false;
			return true;
		}, "Must be an array of File")
		.optional()
		.nullable()
		.default(null),
});
