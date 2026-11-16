import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = { title: "Shop Reviews", description: "Local shops and what people say about them" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 760, margin: "0 auto", padding: 24 }}>
        <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
          <Link href="/shops"><strong>Shop Reviews</strong></Link>
          <form action="/search" style={{ marginLeft: "auto" }}>
            <input name="q" placeholder="Search shops" />
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
