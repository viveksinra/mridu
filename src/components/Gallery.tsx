"use client";
import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/content/config";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
	const [active, setActive] = useState<string | null>(null);
	const [loaded, setLoaded] = useState<Record<string, boolean>>({});
	return (
		<div>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
				{SITE.galleryPlaceholders.map((src, i) => (
					<button key={src + i} className="relative aspect-square overflow-hidden rounded" onClick={() => setActive(src)} aria-label={`Open image ${i+1}`}>
						{!loaded[src] && <div className="absolute inset-0 animate-pulse bg-white/5" />}
						<Image src={src} alt={`Photo ${i+1}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" onLoad={() => setLoaded(s => ({ ...s, [src]: true }))} />
						<div className="absolute inset-0 bg-black/10" />
					</button>
				))}
			</div>
			<AnimatePresence>
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 grid place-items-center bg-black/70"
						onClick={() => setActive(null)}
						aria-label="Close lightbox"
					>
						<motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-[90vw] h-[70vh]">
							<Image src={active} alt="Selected" fill className="object-contain" sizes="90vw" />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}