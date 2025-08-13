"use client";
import AudioPlayer from "@/components/AudioPlayer";
import ScratchReveal from "@/components/ScratchReveal";
import { SITE } from "@/content/config";

export default function SurprisePage() {
	const downloadPdf = async () => {
		const blob = new Blob([
			`Happy Firstday Letter\n\n${SITE.letter}`
		], { type: "application/pdf" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url; a.download = "letter.pdf"; a.click();
		URL.revokeObjectURL(url);
	};
	return (
		<section className="py-10 space-y-6">
			<h1 className="text-2xl font-semibold">Surprise</h1>
			<div className="space-y-4">
				<AudioPlayer src={SITE.audio.happyBirthday} label="Happy Birthday" />
				<AudioPlayer src={SITE.audio.aboutSong} label="About Mridula" />
			</div>
			<div>
				<h2 className="text-lg font-semibold mb-2">Swipe to reveal</h2>
				<ScratchReveal>
					<p className="text-sm opacity-90 whitespace-pre-line">{SITE.letter}</p>
				</ScratchReveal>
				<button className="btn-secondary mt-3" onClick={downloadPdf}>Download letter as PDF</button>
			</div>
		</section>
	);
}