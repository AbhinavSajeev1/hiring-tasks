import { BookingForm } from "@/components/BookingForm";
import { slotTimes } from "@/lib/slots";

export default async function BookPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main>
      <h1>Book an appointment</h1>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <BookingForm times={slotTimes()} />
    </main>
  );
}
