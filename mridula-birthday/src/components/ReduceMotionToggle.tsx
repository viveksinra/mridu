"use client";

export default function ReduceMotionToggle() {
	const pressed = typeof window !== "undefined" && localStorage.getItem("reduce-motion") === "1";
	return (
		<button
			className="text-xs px-2 py-1 rounded border border-white/20 hover:bg-white/10"
			onClick={() => {
				const current = localStorage.getItem("reduce-motion") === "1";
				localStorage.setItem("reduce-motion", current ? "0" : "1");
				location.reload();
			}}
			aria-pressed={pressed}
		>
			Reduce motion
		</button>
	);
}