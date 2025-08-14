"use client";
import { SITE, type SiteConfig } from "@/content/config";
import { motion } from "framer-motion";

type TimelineItem = { title: string; caption?: string };

type ReadonlyTimeline = ReadonlyArray<Readonly<TimelineItem>>;

export default function Timeline() {
	const site: SiteConfig = SITE;
	const fallback: ReadonlyTimeline = [
		{ title: site.met, caption: "Patna • Counselling day" },
		{ title: "You’re doing " + site.study, caption: "Nalanda Engineering College" },
		{ title: "Our late-night Insta chats", caption: "Instagram • Best friends" },
	] as const;
	const items: ReadonlyTimeline = site.timeline ?? fallback;
	return (
		<div className="relative">
			<div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent-2" aria-hidden />
			<ol className="relative pl-8">
				{items.map((t, i) => (
					<motion.li
						key={i}
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: i * 0.08 }}
						className="mb-6"
					>
						<div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent ring-2 ring-white/20" />
						<div className="glass p-4">
							<h3 className="font-semibold">{t.title}</h3>
							{t.caption && <p className="text-xs opacity-80 mt-1">{t.caption}</p>}
						</div>
					</motion.li>
				))}
			</ol>
		</div>
	);
}