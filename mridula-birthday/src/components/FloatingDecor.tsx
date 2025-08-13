"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function FloatingDecor() {
	const reduce = useReducedMotion() || (typeof window !== "undefined" && localStorage.getItem("reduce-motion") === "1");
	if (reduce) return null;
	const items = [
		{ x: "10%", delay: 0 },
		{ x: "30%", delay: 0.6 },
		{ x: "60%", delay: 1.2 },
		{ x: "80%", delay: 1.8 },
	];
	return (
		<div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
			{items.map((it, i) => (
				<motion.div
					key={i}
					className="absolute bottom-[-40px]"
					style={{ left: it.x }}
					initial={{ y: 40, opacity: 0 }}
					animate={{ y: [40, -200], opacity: [0, 1, 0], rotate: [0, 10, -5, 0] }}
					transition={{ duration: 8, repeat: Infinity, delay: it.delay, ease: "easeInOut" }}
				>
					<Heart />
				</motion.div>
			))}
		</div>
	);
}

function Heart() {
	return (
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_6px_rgba(255,126,179,0.5)]">
			<path d="M12 21s-7.57-4.35-9.33-8.69C1.4 9.32 3.1 6 6.3 6c2.02 0 3.19 1.06 3.7 2.06C10.81 7.06 11.98 6 14 6c3.2 0 4.9 3.32 3.63 6.31C19.57 16.65 12 21 12 21z" fill="#ff7eb3"/>
		</svg>
	);
}