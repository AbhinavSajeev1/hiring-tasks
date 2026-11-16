import { prisma } from "./db";
import { startOfSlot } from "./slots";

export type BookingInput = { name: string; email: string; date: string; time: string };
export type BookingResult = { ok: true; id: number } | { ok: false; error: string };

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  if (!name || !email.includes("@")) return { ok: false, error: "Name and a valid email are required." };

  const startsAt = startOfSlot(input.date, input.time);
  if (Number.isNaN(startsAt.getTime())) return { ok: false, error: "Invalid date or time." };

  const existing = await prisma.booking.findFirst({ where: { startsAt } });
  if (existing) return { ok: false, error: "That slot was just taken. Please pick another." };

  const booking = await prisma.booking.create({ data: { name, email, startsAt } });
  return { ok: true, id: booking.id };
}

export async function takenTimes(date: string): Promise<Set<string>> {
  const from = startOfSlot(date, "00:00");
  const to = startOfSlot(date, "23:59");
  const rows = await prisma.booking.findMany({ where: { startsAt: { gte: from, lte: to } } });
  return new Set(rows.map((r) => r.startsAt.toISOString().slice(11, 16)));
}
