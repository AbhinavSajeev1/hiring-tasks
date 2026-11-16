"use client";

import { useRef } from "react";
import { bookSlot } from "@/lib/actions";

export function BookingForm({ times }: { times: string[] }) {
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const utcDate = useRef<HTMLInputElement>(null);
  const utcTime = useRef<HTMLInputElement>(null);

  // Store bookings in UTC: convert the picked local time before posting.
  function toUtc() {
    const picked = new Date(`${dateRef.current!.value}T${timeRef.current!.value}`);
    const iso = picked.toISOString();
    utcDate.current!.value = iso.slice(0, 10);
    utcTime.current!.value = iso.slice(11, 16);
  }

  return (
    <form action={bookSlot} onSubmit={toUtc} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input ref={dateRef} type="date" required />
      <select ref={timeRef} defaultValue="14:00">
        {times.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <input ref={utcDate} type="hidden" name="date" />
      <input ref={utcTime} type="hidden" name="time" />
      <button type="submit">Book</button>
    </form>
  );
}
