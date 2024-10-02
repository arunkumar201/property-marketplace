/** @type {import('next').NextConfig} */
const nextConfig={
	images: {
		formats: ["image/avif"]
	},
	experimental: {
		instrumentationHook: true
	}
};

export default nextConfig;
