import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(
	value: number,
	locale: string = "en-US",
	currency: string = "USD"
): string {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
		currencyDisplay: "symbol",
		currencySign: "accounting",
	}).format(value);
}

// function to get initial from first and last name
export function getInitials(
	firstName?: string | null,
	lastName?: string | null
): string {
	if (firstName && lastName) return firstName.charAt(0) + lastName.charAt(0);
	if (!lastName && firstName) return firstName.slice(0, 2);
	if (!firstName && lastName) return lastName.slice(0, 2);
	return "JD";
}
