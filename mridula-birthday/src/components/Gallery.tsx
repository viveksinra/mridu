"use client";
import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/content/config";

export default function Gallery() {
	const [active, setActive] = useState<string | null>(null);
	return (
		<div>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
				{SITE.galleryPlaceholders.map((src, i) => (
					<button key={src + i} className="relative aspect-square overflow-hidden rounded" onClick={() => setActive(src)} aria-label={`Open image ${i+1}`}>
						<Image src={src} alt={`Photo ${i+1}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
						<div className="absolute inset-0 bg-black/10" />
					</button>
				))}
			</div>
			{active && (
				<button className="fixed inset-0 z-50 grid place-items-center bg-black/70" onClick={() => setActive(null)} aria-label="Close lightbox">
					<div className="relative w-[90vw] h-[70vh]">
						<Image src={active} alt="Selected" fill className="object-contain" sizes="90vw" />
					</div>
				</button>
			)}
		</div>
	);
}