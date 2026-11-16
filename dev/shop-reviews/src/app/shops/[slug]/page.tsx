import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { summarizeReviews } from "@/lib/llm";
import { averageRating } from "@/lib/reviews";
import { formatReviewDate } from "@/lib/format";
import { deleteReview } from "@/lib/actions";
import { AddReviewForm } from "@/components/AddReviewForm";

export const dynamic = "force-dynamic";

export default async function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const shop = await prisma.shop.findUnique({
    where: { slug },
    include: { reviews: { orderBy: { createdAt: "desc" } } },
  });
  if (!shop) notFound();

  const summary = await summarizeReviews(shop.name, shop.reviews);
  const avg = averageRating(shop.reviews.map((r) => r.rating));
  const store = await cookies();
  const reviewerId = store.get("rid")?.value;

  return (
    <main>
      <h1>{shop.name}</h1>
      <p>{shop.city}. {shop.description}</p>
      <p><strong>{avg} / 5</strong> from {shop.reviews.length} reviews</p>
      <section style={{ background: "#f4f4f5", padding: 12, borderRadius: 8 }}>
        <strong>AI summary</strong>
        <p>{summary}</p>
      </section>

      <h2>Reviews</h2>
      {shop.reviews.map((r) => (
        <article key={r.id} style={{ borderBottom: "1px solid #ddd", padding: "12px 0" }}>
          <div><strong>{r.author}</strong> rated {r.rating} / 5</div>
          <div style={{ color: "#666", fontSize: 13 }}>{formatReviewDate(r.createdAt)}</div>
          <div dangerouslySetInnerHTML={{ __html: r.body.replace(/\n/g, "<br />") }} />
          {reviewerId && reviewerId === r.authorId ? (
            <form action={deleteReview}>
              <input type="hidden" name="id" value={r.id} />
              <input type="hidden" name="slug" value={shop.slug} />
              <button type="submit">Delete</button>
            </form>
          ) : null}
        </article>
      ))}

      <h2>Add a review</h2>
      <AddReviewForm shopId={shop.id} slug={shop.slug} />
    </main>
  );
}
