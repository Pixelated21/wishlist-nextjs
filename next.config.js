/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		scrollRestoration: true,
	},
	images: {
		domains: ["utfs.io"],
	},
};

module.exports = nextConfig;
