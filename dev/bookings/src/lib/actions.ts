"use server";

import { redirect } from "next/navigation";
import { createBooking } from "./bookings";

export async function bookSlot(formData: FormData) {
  const result = await createBooking({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
  });
  if (!result.ok) redirect(`/book?error=${encodeURIComponent(result.error)}`);
  redirect(`/confirmation/${result.id}`);
}
