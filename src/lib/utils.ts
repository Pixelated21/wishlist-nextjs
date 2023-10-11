import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(
	price: number | string,
	options: {
		currency?: "USD" | "EUR" | "GBP" | "BDT";
		notation?: Intl.NumberFormatOptions["notation"];
	} = {}
) {
	const { currency = "USD", notation = "compact" } = options;

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		notation,
	}).format(Number(price));
}

export function getInitials(
	firstName?: string | null,
	lastName?: string | null
): string {
	if (firstName && lastName) return firstName.charAt(0) + lastName.charAt(0);
	if (!lastName && firstName) return firstName.slice(0, 2);
	if (!firstName && lastName) return lastName.slice(0, 2);
	return "JD";
}

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function truncate(str: string, length: number) {
	return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function formatBytes(
	bytes: number,
	decimals = 0,
	sizeType: "accurate" | "normal" = "normal"
) {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
	if (bytes === 0) return "0 Byte";
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
		sizeType === "accurate"
			? accurateSizes[i] ?? "Bytest"
			: sizes[i] ?? "Bytes"
	}`;
}

export function isArrayOfFile(files: unknown): files is File[] {
	const isArray = Array.isArray(files);
	if (!isArray) return false;
	return files.every((file) => file instanceof File);
}

export function catchError(err: unknown) {
	if (err instanceof z.ZodError) {
		const errors = err.issues.map((issue) => {
			return issue.message;
		});
		return toast.error(errors.join("\n"));
	} else if (err instanceof Error) {
		return toast.error(err.message);
	} else {
		return toast("Something went wrong, please try again later.");
	}
}
