"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { SITE } from "@/content/config";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
	const [activeIdx, setActiveIdx] = useState<number | null>(null);
	const [loaded, setLoaded] = useState<Record<string, boolean>>({});
	const startX = useRef<number | null>(null);

	const open = (idx: number) => setActiveIdx(idx);
	const close = () => setActiveIdx(null);
	const next = useCallback(() => setActiveIdx(i => (i === null ? i : (i + 1) % SITE.galleryPlaceholders.length)), []);
	const prev = useCallback(() => setActiveIdx(i => (i === null ? i : (i - 1 + SITE.galleryPlaceholders.length) % SITE.galleryPlaceholders.length)), []);

	const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
	const onTouchEnd = (e: React.TouchEvent) => {
		if (startX.current == null) return;
		const dx = e.changedTouches[0].clientX - startX.current;
		if (Math.abs(dx) > 40) { if (dx < 0) { next(); } else { prev(); } }
		startX.current = null;
	};

	return (
		<div>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
				{SITE.galleryPlaceholders.map((src, i) => (
					<button key={src + i} className="relative aspect-square overflow-hidden rounded" onClick={() => open(i)} aria-label={`Open image ${i+1}`}>
						{!loaded[src] && <div className="absolute inset-0 animate-pulse bg-white/5" />}
						<Image src={src} alt={`Photo ${i+1}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" onLoad={() => setLoaded(s => ({ ...s, [src]: true }))} />
						<div className="absolute inset-0 bg-black/10" />
					</button>
				))}
			</div>
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
						<motion.div
							initial={{ scale: 0.95 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.95 }}
							className="relative w-[90vw] h-[70vh]"
							onClick={e => e.stopPropagation()}
							onTouchStart={onTouchStart}
							onTouchEnd={onTouchEnd}
							onKeyDown={(e) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); if (e.key === "Escape") close(); }}
							tabIndex={0}
						>
							<Image src={SITE.galleryPlaceholders[activeIdx]} alt="Selected" fill className="object-contain" sizes="90vw" />
							<button className="absolute left-2 top-1/2 -translate-y-1/2 btn-secondary px-2 py-1" onClick={prev} aria-label="Previous image">‹</button>
							<button className="absolute right-2 top-1/2 -translate-y-1/2 btn-secondary px-2 py-1" onClick={next} aria-label="Next image">›</button>
							<button className="absolute top-2 right-2 btn-secondary px-2 py-1" onClick={close} aria-label="Close">✕</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}