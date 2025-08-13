"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const LETTERS = ["H", "A", "P", "P", "Y"];

export default function BalloonGame() {
	const [popped, setPopped] = useState<boolean[]>(Array(LETTERS.length).fill(false));
	const done = popped.every(Boolean);
	const balloons = useMemo(() => LETTERS.map((l, i) => ({ l, x: 10 + i * 16 })), []);
	const pop = (idx: number) => {
		setPopped(p => {
			if (p[idx]) return p;
			const n = [...p];
			n[idx] = true;
			confetti({ particleCount: 40, spread: 45, origin: { y: 0.9 } });
			return n;
		});
	};
	return (
		<div className="relative h-40 overflow-hidden rounded-md bg-black/20">
			{balloons.map((b, i) => (
				<AnimatePresence key={i}>
					{!popped[i] && (
						<motion.button
							className="absolute bottom-2"
							style={{ left: `${b.x}%` }}
							initial={{ y: 0, scale: 1 }}
							animate={{ y: [0, -90, 0], transition: { duration: 6 + i, repeat: Infinity } }}
							onClick={() => pop(i)}
							aria-label={`Pop balloon ${i+1}`}
						>
							<Balloon label={b.l} />
						</motion.button>
					)}
				</AnimatePresence>
			))}
			<div className="absolute inset-0 grid place-items-center">
				<div className="font-bold text-2xl tracking-widest">
					{LETTERS.map((l, i) => (
						<span key={i} className={popped[i] ? "text-accent" : "text-white/30"}>{l}</span>
					))}
				</div>
				{done && <div className="mt-2 text-xs">You did it! 🎈</div>}
			</div>
		</div>
	);
}

function Balloon({ label }: { label: string }) {
	return (
		<div className="relative">
			<svg width="44" height="60" viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg">
				<ellipse cx="22" cy="22" rx="18" ry="22" fill="#ffd166"/>
				<path d="M22 44 L22 58" stroke="#ffd166" strokeWidth="2"/>
			</svg>
			<div className="absolute inset-0 grid place-items-center font-semibold text-sm">{label}</div>
		</div>
	);
}