"use client";

export default function ShareButton() {
	const onShare = () => {
		if (navigator.share) {
			navigator.share({ title: document.title, url: location.href }).catch(() => {});
		} else {
			navigator.clipboard.writeText(location.href);
			alert("Link copied!");
		}
	};
	return (
		<button className="underline" onClick={onShare} aria-label="Share this surprise">
			Share this surprise
		</button>
	);
}