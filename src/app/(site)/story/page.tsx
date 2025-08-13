import Timeline from "@/components/Timeline";
import { SITE } from "@/content/config";

export default function StoryPage() {
	return (
		<section className="py-10 space-y-6">
			<h1 className="text-2xl font-semibold">Our Story</h1>
			<Timeline />
			<p className="text-sm opacity-90 leading-relaxed">
				{SITE.met} We became best friends and chat a lot on Instagram. You’re doing {SITE.study} — proud of you.
			</p>
			<blockquote className="text-sm opacity-80 border-l-2 border-white/20 pl-3">
				A soft note: Even from one meeting, your kindness stayed with me. Thank you for being you, Mohni.
			</blockquote>
		</section>
	);
}