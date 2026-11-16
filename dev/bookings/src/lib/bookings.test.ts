import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "./db";
import { createBooking } from "./bookings";
import { formatWhen, slotTimes, startOfSlot } from "./slots";

beforeEach(async () => {
  await prisma.booking.deleteMany();
});

describe("createBooking", () => {
  it("creates a booking for a free slot", async () => {
    const result = await createBooking({ name: "Ana", email: "ana@example.com", date: "2026-06-10", time: "14:00" });
    expect(result.ok).toBe(true);
    expect(await prisma.booking.count()).toBe(1);
  });

  it("rejects a second booking for the same slot", async () => {
    await createBooking({ name: "Ana", email: "ana@example.com", date: "2026-06-10", time: "14:00" });
    const second = await createBooking({ name: "Ben", email: "ben@example.com", date: "2026-06-10", time: "14:00" });
    expect(second.ok).toBe(false);
  });

  it("rejects a missing email", async () => {
    const result = await createBooking({ name: "Ana", email: "", date: "2026-06-10", time: "14:00" });
    expect(result.ok).toBe(false);
  });
});

describe("slots", () => {
  it("lists half hour slots", () => {
    expect(slotTimes()[0]).toBe("10:00");
    expect(slotTimes()).toContain("20:30");
  });

  it("formats a confirmation", () => {
    const text = formatWhen(startOfSlot("2026-06-10", "14:00"));
    expect(text).toContain("June 10");
    expect(text).toContain("2:00 PM");
  });
});
