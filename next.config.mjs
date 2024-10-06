/** @type {import('next').NextConfig} */
const nextConfig={
	// typescript: {
	// 	ignoreBuildErrors: true,
	// },
	// eslint: {
	// 	ignoreDuringBuilds: true
	// },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "imgur.com",
			},
			{
				protocol: 'https',
				hostname: "i.imgur.com"
			}
		],
		formats: ["image/avif"],
	},
	experimental: {
		instrumentationHook: true
	}
};

export default nextConfig;
