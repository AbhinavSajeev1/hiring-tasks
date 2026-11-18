import Link from "next/link";
import { prisma } from "@/lib/db";

type ShopRow = { id: number; slug: string; name: string; city: string };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = `%${q}%`;

  const results = q
  ? await prisma.$queryRaw<ShopRow[]>`
      SELECT id, slug, name, city
      FROM Shop
      WHERE name LIKE ${query} OR city LIKE ${query}
      ORDER BY name
    `
  : [];

  return (
    <main>
      <h1>Search</h1>
      <p>{q ? `${results.length} results for "${q}"` : "Type a shop name or city."}</p>
      <ul>
        {results.map((s) => (
          <li key={s.id}>
            <Link href={`/shops/${s.slug}`}>{s.name}</Link> ({s.city})
          </li>
        ))}
      </ul>
    </main>
  );
}
