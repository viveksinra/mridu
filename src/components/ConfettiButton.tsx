"use client";
import { useReducedMotion } from "framer-motion";

export default function ConfettiButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
	const reduce = useReducedMotion() || (typeof window !== "undefined" && localStorage.getItem("reduce-motion") === "1");
	const fire = async () => {
		if (!reduce) {
			const { default: confetti } = await import("canvas-confetti");
			confetti({ particleCount: 60, spread: 55, angle: 60, origin: { x: 0 } });
			confetti({ particleCount: 60, spread: 55, angle: 120, origin: { x: 1 } });
		}
		onClick?.();
	};
	return (
		<button className={`btn-primary ${className}`} onClick={fire} aria-label="Celebrate">
			{children}
		</button>
	);
}