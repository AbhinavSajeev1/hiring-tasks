export function slotTimes(): string[] {
  const times: string[] = [];
  for (let h = 10; h < 21; h++) {
    times.push(`${String(h).padStart(2, "0")}:00`);
    times.push(`${String(h).padStart(2, "0")}:30`);
  }
  return times;
}

export function startOfSlot(date: string, time: string): Date {
  return new Date(`${date}T${time}`);
}

export function formatWhen(startsAt: Date): string {
  const day = startsAt.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const clock = startsAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${day} at ${clock}`;
}
