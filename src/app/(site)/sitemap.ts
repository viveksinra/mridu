export default async function sitemap() {
	const base = "https://example.com";
	return ["/", "/story", "/gallery", "/wishes", "/surprise", "/patna"].map((p) => ({ url: base + p }));
}