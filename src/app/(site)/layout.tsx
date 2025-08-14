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
			<body className="min-h-dvh text-text antialiased">
				<header className="sticky top-0 z-40">
					<div className="mx-auto max-w-screen-md px-4">
						<nav className="glass mt-3 flex items-center justify-between px-4 py-3">
							<Link href="/" className="font-semibold tracking-tight text-sm">
								<span className="font-[var(--font-poppins)] text-gradient">Firstday • {SITE.honoree.nick}</span>
							</Link>
							<div className="flex items-center gap-3 text-sm">
								<Link href="/story" className="hover:opacity-90">Story</Link>
								<Link href="/gallery" className="hover:opacity-90">Gallery</Link>
								<Link href="/wishes" className="hover:opacity-90">Wishes</Link>
								<Link href="/surprise" className="hover:opacity-90">Surprise</Link>
								<ReduceMotionToggle />
							</div>
						</nav>
					</div>
				</header>
				<main className="mx-auto max-w-screen-md px-4">{children}</main>
				<footer className="mx-auto max-w-screen-md px-4 py-10 text-center text-xs opacity-80">
					<ShareButton />
					<div className="mt-2">Made with ❤️ in {SITE.city}</div>
				</footer>
				{isAnalyticsEnabled() && <Analytics />}
			</body>
		</html>
	);
}