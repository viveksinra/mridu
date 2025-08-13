import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const config: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "plus.unsplash.com" },
		],
	},
	experimental: { optimizePackageImports: ["framer-motion"] },
};

export default withAnalyzer(config);
