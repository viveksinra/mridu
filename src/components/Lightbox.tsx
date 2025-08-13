"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
	return (
		<AnimatePresence>
			{src && (
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 grid place-items-center bg-black/70"
					onClick={onClose}
					aria-label="Close lightbox"
				>
					<motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-[90vw] h-[70vh]">
						<Image src={src} alt="Selected" fill className="object-contain" sizes="90vw" />
					</motion.div>
				</motion.button>
			)}
		</AnimatePresence>
	);
}