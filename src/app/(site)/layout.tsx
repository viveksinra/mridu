import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import { baseMetadata } from "@/lib/seo";
import Link from "next/link";
import { SITE } from "@/content/config";
import ShareButton from "@/components/ShareButton";
import ReduceMotionToggle from "@/components/ReduceMotionToggle";
import { isAnalyticsEnabled } from "@/lib/analytics";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = baseMetadata();

export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${poppins.variable}`}>
			<body className="min-h-dvh bg-bg text-text antialiased">
				<header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-bg/70 border-b border-white/10">
					<nav className="mx-auto max-w-screen-md flex items-center justify-between px-4 py-3">
						<Link href="/" className="font-semibold tracking-tight text-sm">
							<span className="font-display">Firstday • {SITE.honoree.nick}</span>
						</Link>
						<div className="flex items-center gap-3">
							<Link href="/story" className="hover:underline">Story</Link>
							<Link href="/gallery" className="hover:underline">Gallery</Link>
							<Link href="/wishes" className="hover:underline">Wishes</Link>
							<Link href="/surprise" className="hover:underline">Surprise</Link>
							<ReduceMotionToggle />
						</div>
					</nav>
				</header>
				<main className="mx-auto max-w-screen-md px-4">{children}</main>
				<footer className="mx-auto max-w-screen-md px-4 py-10 text-center text-xs opacity-70">
					<ShareButton />
					<div className="mt-2">Made with ❤️ in {SITE.city}</div>
				</footer>
				{isAnalyticsEnabled() && <Analytics />}
			</body>
		</html>
	);
}