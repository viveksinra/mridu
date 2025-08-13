"use client";
import { SITE } from "@/content/config";

export default function TypewriterText() {
	return (
		<div className="overflow-hidden whitespace-nowrap">
			<div className="inline-block animate-marquee will-change-transform">
				{SITE.compliments.map((c, i) => (
					<span key={i} className="mx-4 text-sm opacity-90">{c} ✦</span>
				))}
			</div>
		</div>
	);
}