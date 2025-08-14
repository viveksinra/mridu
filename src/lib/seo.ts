import type { Metadata } from "next";
import { SITE } from "@/content/config";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");

export function baseMetadata(): Metadata {
	const title = `Happy Firstday, ${SITE.honoree.nick} ✨`;
	const description = `For ${SITE.honoree.fullName} — from your best friend. A tiny surprise site built with love.`;
	const url = BASE_URL;
	return {
		title,
		description,
		metadataBase: new URL(url),
		openGraph: {
			title,
			description,
			url,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
		icons: {
			icon: [
				{ url: "/icon-192.png", sizes: "192x192" },
				{ url: "/icon-512.png", sizes: "512x512" },
			],
		},
		manifest: "/manifest.webmanifest",
	};
}

export function personJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: SITE.honoree.fullName,
		alternateName: SITE.honoree.nick,
		homeLocation: SITE.city,
		sameAs: [SITE.socials.instagram],
	};
}

export function eventJsonLd() {
	const year = new Date().getFullYear();
	const month = SITE.birthdayMonth;
	const day = SITE.birthdayDay;
	const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
	return {
		"@context": "https://schema.org",
		"@type": "Event",
		name: `Happy Firstday for ${SITE.honoree.fullName}`,
		description: `Celebrating ${SITE.honoree.fullName} (${SITE.honoree.nick}) in ${SITE.city}.`,
		startDate: `${dateStr}T00:00:00+05:30`,
		location: {
			"@type": "Place",
			name: SITE.city,
			address: SITE.city,
		},
		performer: {
			"@type": "Person",
			name: SITE.honoree.fullName,
		},
	};
}