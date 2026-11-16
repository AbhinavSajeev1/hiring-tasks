import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatWhen } from "@/lib/slots";

export const dynamic = "force-dynamic";

export default async function Confirmation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id: Number(id) } });
  if (!booking) notFound();

  return (
    <main>
      <h1>You are booked</h1>
      <p>Thanks {booking.name}. We will see you on {formatWhen(booking.startsAt)}.</p>
      <p>A confirmation was sent to {booking.email}.</p>
    </main>
  );
}
