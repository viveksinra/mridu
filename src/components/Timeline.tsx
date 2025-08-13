"use client";
import { SITE } from "@/content/config";
import { motion } from "framer-motion";

const items = [
	SITE.met,
	"You’re doing " + SITE.study,
	"From one meeting to best friends",
	"Our late-night Insta chats",
];

export default function Timeline() {
	return (
		<ol className="relative border-l border-white/10 pl-4">
			{items.map((t, i) => (
				<motion.li
					key={i}
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ delay: i * 0.1 }}
					className="mb-6"
				>
					<div className="absolute -left-[9px] top-1 w-2 h-2 rounded-full bg-accent" />
					<h3 className="font-semibold">{t}</h3>
					<p className="text-xs opacity-80">Patna • Nalanda Engineering College • Instagram</p>
				</motion.li>
			))}
		</ol>
	);
}