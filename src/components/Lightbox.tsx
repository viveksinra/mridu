"use client";
import Image from "next/image";

export default function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
	return (
		<button className="fixed inset-0 z-50 grid place-items-center bg-black/70" onClick={onClose} aria-label="Close lightbox">
			<div className="relative w-[90vw] h-[70vh]">
				<Image src={src} alt="Selected" fill className="object-contain" sizes="90vw" />
			</div>
		</button>
	);
}