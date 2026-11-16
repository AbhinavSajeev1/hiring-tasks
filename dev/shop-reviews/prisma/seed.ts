import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const shops = [
  { slug: "corner-roasters", name: "Corner Roasters", city: "Brooklyn", description: "Small batch coffee roaster with a tiny espresso bar." },
  { slug: "pageturn-books", name: "Pageturn Books", city: "Hoboken", description: "Independent bookshop with a strong used section." },
  { slug: "bike-doctor", name: "Bike Doctor", city: "Queens", description: "Repairs, tune ups and secondhand commuter bikes." },
  { slug: "green-thumb-nursery", name: "Green Thumb Nursery", city: "Yonkers", description: "Houseplants, herbs and garden supplies." },
  { slug: "luna-bakery", name: "Luna Bakery", city: "Jersey City", description: "Sourdough, pastries and custom cakes." },
];

const authors = ["Dana R.", "Marcus T.", "Priya S.", "Leo B.", "Hannah W.", "Omar K.", "Tess M.", "Jin P."];

const bodies = [
  "Friendly staff and quick service. Will be back.",
  "Great selection, a bit pricey but worth it.",
  "Waited a while but the result was good.",
  "Exactly what I needed, they even helped me carry it to the car.",
  "Clean shop, clear prices, no pressure.",
  "Not my favourite. Staff seemed rushed on a Saturday.",
  "Hidden gem in the neighborhood, tell your friends.",
  "Solid quality. I have been coming here for two years.",
];

async function main() {
  await prisma.review.deleteMany();
  await prisma.shop.deleteMany();
  const base = Date.UTC(2026, 8, 1, 14, 0, 0);
  let n = 0;
  for (const s of shops) {
    const shop = await prisma.shop.create({ data: s });
    for (let i = 0; i < 6; i++) {
      await prisma.review.create({
        data: {
          shopId: shop.id,
          author: authors[(n + i) % authors.length],
          authorId: `seed-${(n + i) % authors.length}`,
          rating: 3 + ((n + i * 2) % 3),
          body: bodies[(n * 3 + i) % bodies.length],
          createdAt: new Date(base + n * 36 * 3600 * 1000),
        },
      });
      n++;
    }
  }
  console.log(`Seeded ${shops.length} shops and ${n} reviews`);
}

main().finally(() => prisma.$disconnect());
