"use client";
import { SITE } from "@/content/config";
import { useEffect, useState } from "react";

export default function TypewriterText() {
	const items = SITE.compliments;
	const [idx, setIdx] = useState(0);
	const [text, setText] = useState("");
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const current = items[idx % items.length];
		const step = () => {
			if (!deleting) {
				if (text.length < current.length) {
					setText(current.slice(0, text.length + 1));
				} else {
					setTimeout(() => setDeleting(true), 1000);
					return;
				}
			} else {
				if (text.length > 0) {
					setText(current.slice(0, text.length - 1));
				} else {
					setDeleting(false);
					setIdx(i => (i + 1) % items.length);
				}
			}
		};
		const timeout = setTimeout(step, deleting ? 40 : 70);
		return () => clearTimeout(timeout);
	}, [text, deleting, idx, items]);

	return (
		<div className="mx-auto max-w-xl text-center">
			<p className="inline text-sm sm:text-base opacity-90">
				{text}
				<span className="ml-0.5 inline-block w-[1ch] animate-pulse text-accent">|</span>
			</p>
		</div>
	);
}