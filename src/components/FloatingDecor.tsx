"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function FloatingDecor() {
	const reduce = useReducedMotion() || (typeof window !== "undefined" && localStorage.getItem("reduce-motion") === "1");
	if (reduce) return null;
	const items = [
		{ x: "12%", delay: 0, type: "heart", size: 26 },
		{ x: "28%", delay: 0.5, type: "balloon", size: 36 },
		{ x: "44%", delay: 1.0, type: "heart", size: 22 },
		{ x: "62%", delay: 1.5, type: "balloon", size: 40 },
		{ x: "78%", delay: 2.2, type: "heart", size: 28 },
	];
	return (
		<div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
			{items.map((it, i) => (
				<motion.div
					key={i}
					className="absolute bottom-[-60px]"
					style={{ left: it.x }}
					initial={{ y: 40, opacity: 0, rotate: 0 }}
					animate={{ y: [40, -220], opacity: [0, 1, 0], rotate: [0, 8, -6, 0] }}
					transition={{ duration: 10, repeat: Infinity, delay: it.delay, ease: "easeInOut" }}
				>
					{it.type === "heart" ? <Heart size={it.size} /> : <Balloon size={it.size + 8} />}
				</motion.div>
			))}
		</div>
	);
}

function Heart({ size }: { size: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_6px_rgba(255,126,179,0.5)]">
			<path d="M12 21s-7.57-4.35-9.33-8.69C1.4 9.32 3.1 6 6.3 6c2.02 0 3.19 1.06 3.7 2.06C10.81 7.06 11.98 6 14 6c3.2 0 4.9 3.32 3.63 6.31C19.57 16.65 12 21 12 21z" fill="#ff8fb1"/>
		</svg>
	);
}

function Balloon({ size }: { size: number }) {
	return (
		<svg width={size} height={Math.round(size * 1.6)} viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_8px_rgba(229,208,250,0.5)]">
			<defs>
				<linearGradient id="bgrad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#ffd3e2"/>
					<stop offset="100%" stopColor="#e5d0fa"/>
				</linearGradient>
			</defs>
			<ellipse cx="22" cy="22" rx="18" ry="22" fill="url(#bgrad)"/>
			<path d="M22 44 L22 58" stroke="#ffd3e2" strokeWidth="2"/>
		</svg>
	);
}