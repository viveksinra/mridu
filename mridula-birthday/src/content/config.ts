export const SITE = {
	honoree: { fullName: "Mridula", nick: "Mohni" },
	city: "Patna",
	study: "M.Tech at Nalanda Engineering College",
	met:
		"We met during counselling in Patna — once in person, then best friends.",
	socials: { instagram: "https://instagram.com/your-handle" },
	birthdayMonth: 8,
	birthdayDay: 24,
	compliments: [
		"Brilliant mind, warmer heart.",
		"Your smile makes ordinary days glow.",
		"From Patna to everywhere — you shine.",
		"Insta chats that feel like stardust.",
	],
	letter: `
    Dear Mridula (Mohni),
    Happy Firstday! I’m grateful for the day we met at counselling in Patna.
    Even from one meeting, you became my best friend. Here’s a tiny corner of the web
    just for you. 🎂✨
  `,
	galleryPlaceholders: [
		"/images/placeholders/1.svg",
		"/images/placeholders/2.svg",
		"/images/placeholders/3.svg",
		"/images/placeholders/4.svg",
		"/images/placeholders/5.svg",
		"/images/placeholders/6.svg",
	],
	audio: {
		happyBirthday: "/audio/hbd.mp3",
		aboutSong: "/audio/about-mridula.mp3",
	},
} as const;

export type SiteConfig = typeof SITE;