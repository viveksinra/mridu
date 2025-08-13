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
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,126,179,0.25),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,209,102,0.25),transparent_40%)] animate-gradient-slow" aria-hidden />
			{!reduce && <FloatingDecor />}
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="text-4xl sm:text-5xl font-extrabold font-[var(--font-poppins)] tracking-tight"
			>
				Happy Firstday, {SITE.honoree.nick} ✨
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
				className="mt-3 text-sm sm:text-base opacity-90"
			>
				For {SITE.honoree.fullName} — from your best friend.
			</motion.p>
			<div className="mt-6 w-full max-w-sm rounded-xl border border-white/15 bg-white/5 p-4">
				<p className="text-lg font-semibold">Today’s the day! 🎉</p>
				<p className="text-xs opacity-80">Happy Firstday, enjoy the surprises below.</p>
			</div>
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