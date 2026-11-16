"use client";

import { useState } from "react";
import { addReview } from "@/lib/actions";

export function AddReviewForm({ shopId, slug }: { shopId: number; slug: string }) {
  const [error, setError] = useState("");

  function validate(e: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    const author = String(data.get("author") ?? "").trim();
    const body = String(data.get("body") ?? "").trim();
    const rating = Number(data.get("rating"));
    if (!author || author.length > 60) {
      e.preventDefault();
      setError("Please enter your name (60 characters max).");
    } else if (body.length < 10 || body.length > 1000) {
      e.preventDefault();
      setError("Reviews must be between 10 and 1000 characters.");
    } else if (!(rating >= 1 && rating <= 5)) {
      e.preventDefault();
      setError("Pick a rating from 1 to 5.");
    } else {
      setError("");
    }
  }

  return (
    <form action={addReview} onSubmit={validate} style={{ display: "grid", gap: 8, maxWidth: 480 }}>
      <input type="hidden" name="shopId" value={shopId} />
      <input type="hidden" name="slug" value={slug} />
      <input name="author" placeholder="Your name" />
      <select name="rating" defaultValue="5">
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} stars
          </option>
        ))}
      </select>
      <textarea name="body" rows={4} placeholder="Write your review" />
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      <button type="submit">Post review</button>
    </form>
  );
}
