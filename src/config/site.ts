export const siteConfig = {
	name: "Dream Catch",
	mainNav: [
		{
			name: "Profile",
			url: "/profile",
			isDisabled: false,
			is_visible: true,
            is_auth: true,
		},
		{
			name: "Claimed Items",
			url: "/claimed-items",
			isDisabled: true,
			is_visible: true,
			is_auth: true,
		},
		{
			name: "Gift Ideas",
			url: "/giftideas",
			isDisabled: true,
			is_visible: true,
			is_auth: true,
		},
	],
};
