# Task 3.1 — Sermons Page Implementation

**File:** `src/pages/SermonsPage.tsx`  
**Branch:** `feature/phase3-sermons-events`  
**Date:** 2026-02-17

## Overview

New page component that fetches sermon content from Sanity CMS and renders it as a responsive, filterable card grid with a modal detail/video view.

## Implementation Details

### Data fetching

- Uses `useSanityData<Sermon[]>('sermons', SERMONS_QUERY)` — leverages existing React Query hook with stale-while-revalidate caching and retry logic.

### State handling

| State   | UI                                                                             |
| ------- | ------------------------------------------------------------------------------ |
| Loading | 6 skeleton cards with shimmer animation in a responsive grid                   |
| Error   | `<ContentFallbackBanner />` (MUI Alert)                                        |
| Empty   | Centered message: "No sermons available yet. Check back after Sunday service." |
| Success | Responsive card grid (1/2/3 columns)                                           |

### Features

- **Speaker dropdown filter** — Derived from data via `useMemo`, filters client-side. Only shown when 2+ unique speakers exist.
- **Card content** — Thumbnail image (fallback: `DEFAULT_SERMON_THUMBNAIL`), title, formatted date (`date-fns`), speaker chip.
- **Detail dialog** — MUI `<Dialog>` with embedded video player (YouTube/Facebook URL detection), speaker, date, and scripture metadata.

### Video embedding

- `getEmbedUrl()` helper detects YouTube (`youtube.com/watch?v=` or `youtu.be/`) and Facebook video URLs, converts to embeddable iframe URLs.
- Falls back to a clickable link if the URL format is unrecognized.

## Design Decisions

- **Modal vs. new route** — Used modal (Dialog) to keep v1 simple; avoids needing a `SermonDetailPage` and additional routing.
- **No pagination** — Per spec, deferred until sermon count exceeds ~50.
- **No search** — Per spec, not in v1.

## Success Metrics

| Metric                          | Status                       |
| ------------------------------- | ---------------------------- |
| Page renders at `/sermons`      | ✅ (needs route in Task 3.4) |
| Sermons display newest-first    | ✅ (GROQ `order(date desc)`) |
| Speaker dropdown filters        | ✅                           |
| Fallback banner on Sanity error | ✅                           |
| Missing thumbnails use fallback | ✅                           |
| All images have alt attributes  | ✅                           |
| Empty state renders message     | ✅                           |
| No blank page possible          | ✅ (all 4 states handled)    |
