import TypewriterText from "@/components/TypewriterText";
import ConfettiButton from "@/components/ConfettiButton";
import BalloonGame from "@/components/BalloonGame";

export default function WishesPage() {
	return (
		<section className="py-10 space-y-6">
			<h1 className="text-2xl font-semibold">Wishes</h1>
			<TypewriterText />
			<ConfettiButton className="mt-2">Tap for confetti</ConfettiButton>
			<div className="pt-6">
				<BalloonGame />
			</div>
		</section>
	);
}