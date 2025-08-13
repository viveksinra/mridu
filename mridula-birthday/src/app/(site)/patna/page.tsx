export default function PatnaPage() {
	return (
		<section className="py-10 space-y-6">
			<h1 className="text-2xl font-semibold">Patna</h1>
			<div className="rounded-lg border border-white/10 p-4 bg-white/5">
				<p className="text-sm opacity-85 mb-3">A little nod to the city where we met.</p>
				<svg viewBox="0 0 400 120" className="w-full h-24" aria-hidden>
					<rect x="0" y="90" width="400" height="30" fill="#c3f0ca" fillOpacity="0.2" />
					<rect x="40" y="60" width="20" height="30" fill="#ff7eb3"/>
					<rect x="65" y="50" width="25" height="40" fill="#ffd166"/>
					<rect x="95" y="70" width="18" height="20" fill="#c3f0ca"/>
					<rect x="120" y="55" width="22" height="35" fill="#ff7eb3"/>
					<rect x="150" y="45" width="30" height="45" fill="#ffd166"/>
				</svg>
			</div>
		</section>
	);
}