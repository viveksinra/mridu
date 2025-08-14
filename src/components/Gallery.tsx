"use client";
import Image from "next/image";
import { useState } from "react";
import { SITE, type SiteConfig } from "@/content/config";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
	const [activeIdx, setActiveIdx] = useState<number | null>(null);
	const [loaded, setLoaded] = useState<Record<string, boolean>>({});
	const site: SiteConfig = SITE;
	const images: readonly string[] = (site.gallery && site.gallery.length > 0) ? site.gallery : site.galleryPlaceholders;
	return (
		<div>
			{/* Mobile swipe carousel */}
			<div className="md:hidden -mx-4 px-4 overflow-x-auto">
				<div className="flex gap-3 snap-x snap-mandatory">
					{images.map((src, i) => (
						<button key={src + i} className="relative snap-center shrink-0 w-[80%] aspect-[4/5] overflow-hidden rounded-2xl" onClick={() => setActive(src)} aria-label={`Open image ${i+1}`}>
							{!loaded[src] && <div className="absolute inset-0 animate-pulse bg-white/5" />}
							<Image src={src} alt={`Photo ${i+1}`} fill className="object-cover" sizes="80vw" onLoad={() => setLoaded(s => ({ ...s, [src]: true }))} />
							<div className="absolute inset-0 bg-black/10" />
						</button>
					))}
				</div>
			</div>

			{/* Desktop grid */}
			<div className="hidden md:grid grid-cols-3 gap-3">
				{images.map((src, i) => (
					<motion.button
						key={src + i}
						className="relative aspect-[4/5] overflow-hidden rounded-2xl"
						onClick={() => setActive(src)}
						aria-label={`Open image ${i+1}`}
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
					>
						{!loaded[src] && <div className="absolute inset-0 animate-pulse bg-white/5" />}
						<Image src={src} alt={`Photo ${i+1}`} fill className="object-cover" sizes="33vw" onLoad={() => setLoaded(s => ({ ...s, [src]: true }))} />
						<div className="absolute inset-0 bg-black/10" />
					</motion.button>
				))}
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{activeIdx !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 grid place-items-center bg-black/70"
						onClick={close}
						aria-label="Close lightbox"
					>
						<motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} className="relative w-[90vw] h-[72vh]">
							<Image src={active} alt="Selected" fill className="object-contain" sizes="90vw" />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}