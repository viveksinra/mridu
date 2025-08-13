"use client";
import confetti from "canvas-confetti";

export default function ConfettiButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
	const fire = () => {
		confetti({ particleCount: 60, spread: 55, angle: 60, origin: { x: 0 } });
		confetti({ particleCount: 60, spread: 55, angle: 120, origin: { x: 1 } });
		onClick?.();
	};
	return (
		<button className={`btn-primary ${className}`} onClick={fire} aria-label="Celebrate">
			{children}
		</button>
	);
}