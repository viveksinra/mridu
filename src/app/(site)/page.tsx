"use client";
import { SITE } from "@/content/config";
import FloatingDecor from "@/components/FloatingDecor";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const AudioPlayer = dynamic(() => import("@/components/AudioPlayer"), { ssr: false });

export default function HomePage() {
	const reduce = useReducedMotion() || (typeof window !== "undefined" && localStorage.getItem("reduce-motion") === "1");

	useEffect(() => {
		if (reduce) return;
		if (typeof window === "undefined") return;
		if (sessionStorage.getItem("did-confetti") === "1") return;
		(async () => {
			const { default: confetti } = await import("canvas-confetti");
			confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
			confetti({ particleCount: 80, spread: 100, angle: 60, origin: { x: 0, y: 0.7 } });
			confetti({ particleCount: 80, spread: 100, angle: 120, origin: { x: 1, y: 0.7 } });
			sessionStorage.setItem("did-confetti", "1");
		})();
	}, [reduce]);

	return (
		<section className="relative min-h-[80svh] flex flex-col items-center justify-center text-center py-16">
			<div className="absolute inset-0 -z-10 animate-gradient-slow" aria-hidden />
			{!reduce && <FloatingDecor />}
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
				<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs">
					<span className="text-accent">It’s your day</span> <span>🎉</span>
				</div>
			</motion.div>
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
				className="mt-4 text-4xl sm:text-5xl font-extrabold font-[var(--font-poppins)] tracking-tight text-gradient"
			>
				Happy Firstday, {SITE.honoree.nick} ✨
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
				className="mt-3 text-sm sm:text-base opacity-90"
			>
				For {SITE.honoree.fullName} — from your best friend.
			</motion.p>
			<div className="mt-8 flex gap-3 flex-wrap items-center justify-center">
				<a href="#audio" className="btn-primary" aria-label="Play surprise song">Play Surprise Song</a>
				<Link href="/wishes" className="btn-secondary" aria-label="Open wishes page">Open Wishes</Link>
			</div>
			<div id="audio" className="mt-14 w-full max-w-md">
				<AudioPlayer src={SITE.audio.happyBirthday} label="Happy Birthday" />
			</div>
		</section>
	);
}