export async function GET() {
	const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
	return new Response(
		`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`,
		{ headers: { "Content-Type": "text/plain" } }
	);
}