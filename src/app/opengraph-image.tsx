import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "linear-gradient(135deg,#0f0b1a,#201735)",
					color: "#fff",
					fontSize: 72,
					fontWeight: 800,
					letterSpacing: -1,
					fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
				}}
			>
				<span style={{
					backgroundImage: "linear-gradient(90deg,#ff7eb3,#ffd166)",
					WebkitBackgroundClip: "text",
					backgroundClip: "text",
					color: "transparent",
				}}>
					Happy Firstday, Mohni ✨
				</span>
			</div>
		),
		{ ...size }
	);
}
