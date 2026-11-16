"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./db";

export async function addReview(formData: FormData) {
  const shopId = Number(formData.get("shopId"));
  const slug = String(formData.get("slug"));
  const author = String(formData.get("author"));
  const rating = Number(formData.get("rating"));
  const body = String(formData.get("body"));

  const store = await cookies();
  let reviewerId = store.get("rid")?.value;
  if (!reviewerId) {
    reviewerId = randomUUID();
    store.set("rid", reviewerId, { httpOnly: true, path: "/", sameSite: "lax" });
  }

  await prisma.review.create({
    data: { shopId, author, authorId: reviewerId, rating, body },
  });

  redirect(`/shops/${slug}`);
}

export async function deleteReview(formData: FormData) {
  const id = Number(formData.get("id"));
  const slug = String(formData.get("slug"));

  await prisma.review.delete({ where: { id } });

  redirect(`/shops/${slug}`);
}
