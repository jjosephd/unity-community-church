# Task 2.4 — Write GROQ Queries

**Status:** ✅ Complete  
**File:** [`src/lib/sanityQueries.ts`](file:///Users/admin/Desktop/Coding/ucc/ucc-app/src/lib/sanityQueries.ts)

---

## Queries Implemented

| Constant              | `_type` / `_id` Filter    | Ordering                          | Temporal Filter                                 | Image Projection               |
| --------------------- | ------------------------- | --------------------------------- | ----------------------------------------------- | ------------------------------ |
| `SERMONS_QUERY`       | `_type == "sermon"`       | `date desc`                       | —                                               | `thumbnailUrl`, `thumbnailAlt` |
| `EVENTS_QUERY`        | `_type == "event"`        | `date asc`                        | `date >= now()`                                 | `imageUrl`, `imageAlt`         |
| `ANNOUNCEMENTS_QUERY` | `_type == "announcement"` | `priority desc, publishDate desc` | `!defined(expiryDate) \|\| expiryDate >= now()` | —                              |
| `SITE_SETTINGS_QUERY` | `_id == "siteSettings"`   | — (singleton `[0]`)               | —                                               | —                              |

---

## Success Metrics

| Metric                                    | Status                                                                           |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| All 4 queries exported as named constants | ✅ `SERMONS_QUERY`, `EVENTS_QUERY`, `ANNOUNCEMENTS_QUERY`, `SITE_SETTINGS_QUERY` |
| Every query has explicit `_type` filter   | ✅ (siteSettings uses `_id` per spec)                                            |
| Image fields fully projected              | ✅ `thumbnailUrl`/`thumbnailAlt` on sermons; `imageUrl`/`imageAlt` on events     |
| Announcements filter expired content      | ✅ `!defined(expiryDate) \|\| expiryDate >= now()`                               |
| Events filter past events                 | ✅ `date >= now()`                                                               |
| Site settings targets fixed ID            | ✅ `_id == "siteSettings"` — not `_type`                                         |
| TypeScript compiles                       | ✅ `npx tsc --noEmit` passes with 0 errors                                       |
