# Shop Reviews

Small directory of local shops with customer reviews and an AI generated summary per shop.

```
pnpm i
pnpm db:seed
pnpm dev
pnpm test
```

The LLM client in `src/lib/llm.ts` is a mock (canned text, fake latency), so no API key is needed.

Routes: `/shops`, `/shops/[slug]`, `/search?q=`.
