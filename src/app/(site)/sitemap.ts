export default async function sitemap() {
	const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
	return ["/", "/story", "/gallery", "/wishes", "/surprise", "/patna"].map((p) => ({ url: base + p }));
}