"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Visualizer = dynamic(() => import("./Visualizer"), { ssr: false });

export default function AudioPlayer({ src, label }: { src: string; label: string }) {
	const audioRef = useRef<HTMLAudioElement>(null!);
	const [, setCanPlay] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		const onCanPlay = () => setCanPlay(true);
		const onTime = () => setProgress(audio.currentTime / audio.duration || 0);
		audio.addEventListener("canplay", onCanPlay);
		audio.addEventListener("timeupdate", onTime);
		return () => {
			audio.removeEventListener("canplay", onCanPlay);
			audio.removeEventListener("timeupdate", onTime);
		};
	}, []);

	const toggle = async () => {
		const audio = audioRef.current!;
		if (playing) {
			audio.pause();
			setPlaying(false);
		} else {
			try {
				await audio.play();
				setPlaying(true);
			} catch { 
				alert("Tap to allow audio playback.");
			}
		}
	};

	return (
		<div id="audio" className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
			<div className="flex items-center justify-between gap-3">
				<button
					className="btn-primary px-3 py-1 text-sm"
					onClick={toggle}
					aria-label={playing ? "Pause" : "Play"}
				>
					{playing ? "Pause" : "Play"}
				</button>
				<div className="text-xs opacity-80">{label}</div>
			</div>
			<div className="mt-3 h-1.5 rounded bg-white/10 overflow-hidden" aria-label="Progress">
				<div className="h-full bg-accent" style={{ width: `${Math.round(progress * 100)}%` }} />
			</div>
			<audio ref={audioRef} src={src} preload="none" />
			<div className="mt-4">
				<Visualizer audioRef={audioRef} playing={playing} />
			</div>
		</div>
	);
}