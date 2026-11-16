import Link from "next/link";
import { prisma } from "@/lib/db";
import { averageRating } from "@/lib/reviews";

export default async function ShopsPage() {
  const shops = await prisma.shop.findMany({ orderBy: { name: "asc" } });

  const rows = [];
  for (const shop of shops) {
    const reviews = await prisma.review.findMany({ where: { shopId: shop.id } });
    rows.push({ ...shop, count: reviews.length, avg: averageRating(reviews.map((r) => r.rating)) });
  }

  return (
    <main>
      <h1>Shops</h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {rows.map((s) => (
          <li key={s.id}>
            <Link href={`/shops/${s.slug}`}><strong>{s.name}</strong></Link> <span>{s.city}</span>
            <div>{s.avg} / 5 from {s.count} reviews</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
