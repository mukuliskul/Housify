/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				hostname: "upload.wikimedia.org",
			},
		],
	},
};

export default nextConfig;
