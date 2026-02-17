# Phase 2 Integration Strategy — Sanity ↔ Vite Frontend

> **Date:** 2026-02-17  
> **Branch:** `feature/phase-2-sanity-client`  
> **Scope:** Tasks 2.1–2.2 (foundation layer)

---

## Architecture Overview

The Vite frontend communicates with Sanity Cloud via **read-only HTTP requests** to `cdn.sanity.io`. There is no backend, no middleware, and no webhook — just a typed client that sends GROQ queries and receives JSON.

```
┌─────────────────────┐       ┌─────────────────────┐
│  Vite Frontend      │       │  Sanity Cloud CDN   │
│  (React + TS)       │──────▶│  cdn.sanity.io      │
│                     │ GROQ  │                     │
│  @sanity/client     │ query │  Public read, no    │
│  @tanstack/react-   │◀──────│  auth token needed  │
│  query (caching)    │ JSON  │                     │
└─────────────────────┘       └─────────────────────┘
```

## Dependency Choices

| Package                 | Version    | Purpose                                                                  |
| ----------------------- | ---------- | ------------------------------------------------------------------------ |
| `@sanity/client`        | 7.15.0     | GROQ query client — connects to Sanity CDN using `projectId` + `dataset` |
| `@sanity/image-url`     | 2.0.3      | Builds responsive image URLs from Sanity image asset references          |
| `@tanstack/react-query` | (existing) | Caching, retry, stale-while-revalidate — wraps Sanity fetches            |

## Type Safety Strategy

**Problem:** Raw Sanity documents contain internal fields (`_rev`, `_createdAt`, asset references) that leak implementation details into UI components.

**Solution:** Define **projection-aligned** TypeScript interfaces in `src/types/sanity.ts` that match the shape of GROQ query results, not raw documents:

- `SanityDocument` — shared base with `_id` (DRY across all document types)
- `Sermon extends SanityDocument` — flattened `thumbnailUrl` / `thumbnailAlt`
- `Event extends SanityDocument` — flattened `imageUrl` / `imageAlt`
- `Announcement extends SanityDocument` — `body: unknown[]` for Portable Text
- `SiteSettings` — no `_id` (singleton, queried by fixed ID)

**Why `unknown[]` for Portable Text?** Concrete Portable Text types are deferred to Phase 3 rendering (Task 3.3). Using `unknown[]` now prevents premature coupling while maintaining type safety — callers must narrow the type before accessing block properties.

**Scaling:** When adding future content types (BlogPost, Staff, Ministry), they extend `SanityDocument` and follow the same projection pattern.

## Data Flow (Tasks 2.3–2.5, upcoming)

```
src/types/sanity.ts        → Type definitions (✅ done)
src/lib/sanityClient.ts    → Configured @sanity/client instance
src/lib/sanityQueries.ts   → Named GROQ query constants
src/hooks/useSanityData.ts → Generic hook: useSanityData<T>(key, query)
src/pages/*Page.tsx         → useSanityData<Sermon[]>(…) → typed rendering
```

## Completed Benchmarks (Tasks 2.1 & 2.2)

| Metric                        | Result                                                              | Status |
| ----------------------------- | ------------------------------------------------------------------- | ------ |
| `@sanity/client` installed    | v7.15.0                                                             | ✅     |
| `@sanity/image-url` installed | v2.0.3                                                              | ✅     |
| `npm run build`               | Exit 0 (built in 61s)                                               | ✅     |
| `npx tsc --noEmit`            | Exit 0                                                              | ✅     |
| `npm run lint`                | Exit 0                                                              | ✅     |
| Zero `: any` in sanity.ts     | Confirmed (0 matches)                                               | ✅     |
| 5 interfaces exported         | `SanityDocument`, `Sermon`, `Event`, `Announcement`, `SiteSettings` | ✅     |
