"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Props = { audioRef: React.RefObject<HTMLAudioElement>; playing: boolean };

type AudioContextLike = AudioContext & { resume?: () => Promise<void> };

declare global {
	interface Window {
		webkitAudioContext?: {
			new (): AudioContextLike;
			prototype: AudioContextLike;
		};
	}
}

export default function Visualizer({ audioRef, playing }: Props) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const rafRef = useRef<number | null>(null);
	const ctxRef = useRef<AudioContextLike | null>(null);
	const reduce = useReducedMotion() || (typeof window !== "undefined" && localStorage.getItem("reduce-motion") === "1");

	useEffect(() => {
		if (!playing) return;
		if (!audioRef.current) return;
		if (reduce) return;
		let mounted = true;
		(async () => {
			if (!ctxRef.current) {
				const Ctor: typeof AudioContext = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext) as typeof AudioContext;
				ctxRef.current = new Ctor() as AudioContextLike;
			}
			const ctx = ctxRef.current!;
			const source = ctx.createMediaElementSource(audioRef.current!);
			const analyser = (analyserRef.current ||= ctx.createAnalyser());
			analyser.fftSize = 256;
			source.connect(analyser);
			analyser.connect(ctx.destination);
			const bufferLength = analyser.frequencyBinCount;
			const dataArray = new Uint8Array(bufferLength);
			const canvas = canvasRef.current!;
			const c = canvas.getContext("2d")!;
			let gradient: CanvasGradient | null = null;
			const render = () => {
				if (!mounted) return;
				const w = canvas.clientWidth * devicePixelRatio;
				const h = canvas.clientHeight * devicePixelRatio;
				if (canvas.width !== w) { canvas.width = w; gradient = null; }
				if (canvas.height !== h) { canvas.height = h; gradient = null; }
				if (!gradient) {
					gradient = c.createLinearGradient(0, 0, 0, h);
					gradient.addColorStop(0, "#ffd3e2");
					gradient.addColorStop(1, "#ff8fb1");
				}
				analyser.getByteFrequencyData(dataArray);
				c.clearRect(0, 0, w, h);
				const bars = 42;
				const barWidth = Math.max(2, Math.floor(w / (bars + 6)));
				for (let i = 0; i < bars; i++) {
					const v = dataArray[Math.floor((i / bars) * bufferLength)] / 255;
					const bh = v * h * 0.8;
					c.fillStyle = gradient!;
					c.fillRect(i * (barWidth + 4), h - bh, barWidth, bh);
				}
				rafRef.current = requestAnimationFrame(render);
			};
			render();
		})();
		return () => {
			mounted = false;
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [playing, audioRef, reduce]);

	if (reduce) return null;
	return <canvas className="w-full h-16 rounded bg-black/30" ref={canvasRef} aria-hidden />;
}