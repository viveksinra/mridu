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
					background: "linear-gradient(135deg,#ff7eb3,#ffd166)",
					color: "#0f0b1a",
					fontSize: 64,
					fontWeight: 700,
					letterSpacing: -1,
					fontFamily: "sans-serif",
				}}
			>
				Gallery — Happy Firstday
			</div>
		),
		{ ...size }
	);
}