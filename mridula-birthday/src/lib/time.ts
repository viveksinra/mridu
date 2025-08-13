const KOLKATA_TZ = "Asia/Kolkata" as const;

export function getNextBirthdayDate(
  month: number,
  day: number,
  now: Date = new Date()
): Date {
	// month is 1-12; JS Date month is 0-11
	const yearNow = new Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		timeZone: KOLKATA_TZ,
	}).formatToParts(now).find(p => p.type === "year")?.value as string;
	const kolkataYear = parseInt(yearNow, 10);

	const targetThisYear = zonedDate(kolkataYear, month, day);
	if (targetThisYear.getTime() < getNowKolkata(now).getTime()) {
		return zonedDate(kolkataYear + 1, month, day);
	}
	return targetThisYear;
}

export function getNowKolkata(now: Date = new Date()): Date {
	// Convert current time to Kolkata time by formatting and parsing back
	const parts = new Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZone: KOLKATA_TZ,
	}).formatToParts(now);
	const get = (t: string) => parseInt(parts.find(p => p.type === t)!.value, 10);
	return new Date(Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second")));
}

export function getCountdown(
	month: number,
	day: number,
	now: Date = new Date()
) {
	const target = getNextBirthdayDate(month, day, now);
	const diffMs = target.getTime() - getNowKolkata(now).getTime();
	const clamped = Math.max(diffMs, 0);
	const seconds = Math.floor(clamped / 1000);
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor((seconds % 86400) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return { target, diffMs: clamped, days, hours, minutes, seconds: secs };
}

export function isBirthdayToday(month: number, day: number, now: Date = new Date()): boolean {
	const nowK = getNowKolkata(now);
	const target = zonedDate(nowK.getUTCFullYear(), month, day);
	return (
		nowK.getUTCFullYear() === target.getUTCFullYear() &&
		nowK.getUTCMonth() === target.getUTCMonth() &&
		nowK.getUTCDate() === target.getUTCDate()
	);
}

function zonedDate(year: number, month: number, day: number): Date {
	// Build date at midnight 00:00:00 in Asia/Kolkata then map to UTC Date
	const parts = new Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZone: KOLKATA_TZ,
	}).formatToParts(new Date(Date.UTC(year, month - 1, day, 0, 0, 0)));
	const get = (t: string) => parseInt(parts.find(p => p.type === t)!.value, 10);
	return new Date(Date.UTC(get("year"), get("month") - 1, get("day"), 0, 0, 0));
}