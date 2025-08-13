"use client";
import { useEffect, useState } from "react";
import { getCountdown, isBirthdayToday } from "@/lib/time";

export default function Countdown({ month, day }: { month: number; day: number }) {
	const [state, setState] = useState(() => getCountdown(month, day));
	const [today, setToday] = useState(() => isBirthdayToday(month, day));
	useEffect(() => {
		const id = setInterval(() => {
			setState(getCountdown(month, day));
			setToday(isBirthdayToday(month, day));
		}, 1000);
		return () => clearInterval(id);
	}, [month, day]);

	if (today) {
		return (
			<div aria-live="polite" className="rounded-xl border border-white/15 bg-white/5 p-4">
				<p className="text-lg font-semibold">Today’s the day! 🎉</p>
				<p className="text-xs opacity-80">Happy Firstday, enjoy the surprises below.</p>
			</div>
		);
	}

	return (
		<div aria-live="polite" className="rounded-xl border border-white/15 bg-white/5 p-4">
			<p className="text-xs opacity-80">Counting down to August 24 (Asia/Kolkata)</p>
			<div className="mt-2 grid grid-cols-4 gap-2 text-center">
				<Time value={state.days} label="Days" />
				<Time value={state.hours} label="Hours" />
				<Time value={state.minutes} label="Min" />
				<Time value={state.seconds} label="Sec" />
			</div>
		</div>
	);
}

function Time({ value, label }: { value: number; label: string }) {
	return (
		<div className="rounded-lg bg-black/30 p-2">
			<div className="text-xl font-bold tabular-nums" aria-label={`${label} ${value}`}>{value.toString().padStart(2, "0")}</div>
			<div className="text-[10px] opacity-70">{label}</div>
		</div>
	);
}