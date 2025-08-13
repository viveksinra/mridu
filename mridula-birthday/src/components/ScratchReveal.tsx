"use client";
import { useEffect, useRef, useState } from "react";

export default function ScratchReveal({ children }: { children: React.ReactNode }) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [cleared, setCleared] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;
		let drawing = false;
		const resize = () => {
			const w = canvas.clientWidth * devicePixelRatio;
			const h = canvas.clientHeight * devicePixelRatio;
			canvas.width = w; canvas.height = h;
			ctx.fillStyle = "#202020";
			ctx.fillRect(0, 0, w, h);
		};
		resize();
		window.addEventListener("resize", resize);
		const start = (e: PointerEvent) => { drawing = true; scratch(e); };
		const end = () => { drawing = false; checkCleared(); };
		const move = (e: PointerEvent) => { if (drawing) scratch(e); };
		const scratch = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			const x = (e.clientX - rect.left) * devicePixelRatio;
			const y = (e.clientY - rect.top) * devicePixelRatio;
			ctx.globalCompositeOperation = "destination-out";
			ctx.beginPath();
			ctx.arc(x, y, 24 * devicePixelRatio, 0, Math.PI * 2);
			ctx.fill();
		};
		const checkCleared = () => {
			const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
			let transparent = 0;
			for (let i = 3; i < pixels.length; i += 4) if (pixels[i] === 0) transparent++;
			if (transparent / (pixels.length / 4) > 0.6) setCleared(true);
		};
		canvas.addEventListener("pointerdown", start);
		canvas.addEventListener("pointerup", end);
		canvas.addEventListener("pointermove", move);
		canvas.addEventListener("pointerleave", end);
		return () => {
			window.removeEventListener("resize", resize);
			canvas.removeEventListener("pointerdown", start);
			canvas.removeEventListener("pointerup", end);
			canvas.removeEventListener("pointermove", move);
			canvas.removeEventListener("pointerleave", end);
		};
	}, []);

	return (
		<div className="relative overflow-hidden rounded-2xl border border-white/10">
			<div className="relative z-0 p-6 text-center">
				{children}
			</div>
			<canvas ref={canvasRef} className="absolute inset-0 z-10 touch-none"/>
			<div className="absolute top-2 right-2 z-20">
				<button
					className="btn-secondary text-xs"
					onClick={() => { setCleared(false); const c = canvasRef.current!; const ctx = c.getContext("2d")!; ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = "#202020"; ctx.fillRect(0,0,c.width,c.height); }}
				>
					Reset
				</button>
			</div>
			{cleared && <div className="absolute inset-0 z-20 grid place-items-center pointer-events-none text-accent">
				<span className="text-lg font-semibold">Revealed ✨</span>
			</div>}
		</div>
	);
}