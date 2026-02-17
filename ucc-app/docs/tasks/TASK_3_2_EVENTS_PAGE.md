# Task 3.2 — Events Page Implementation

**File:** `src/pages/EventsPage.tsx`  
**Branch:** `feature/phase3-sermons-events`  
**Date:** 2026-02-17

## Overview

New page component that fetches upcoming events from Sanity CMS and renders them as a responsive card grid with icon-based metadata and recurring event badges.

## Implementation Details

### Data fetching

- Uses `useSanityData<Event[]>('events', EVENTS_QUERY)` — GROQ query already filters to future events (`date >= now()`) and orders by date ascending.

### State handling

| State   | UI                                                                  |
| ------- | ------------------------------------------------------------------- |
| Loading | 4 skeleton cards with shimmer animation in a 2-column grid          |
| Error   | `<ContentFallbackBanner />` (MUI Alert)                             |
| Empty   | Centered message: "No upcoming events. Stay tuned for what's next!" |
| Success | Responsive card grid (1 col mobile, 2 col tablet+)                  |

### Features

- **Card content** — Event image (fallback: `DEFAULT_EVENT_IMAGE`), title, formatted date, time, location, description (truncated to 3 lines).
- **Icon metadata rows** — Calendar, time, and location icons from `@mui/icons-material` for visual clarity.
- **Recurring badge** — `<Chip>` with a recurring icon shown when `event.isRecurring === true`.

### Component structure

- `EventSkeleton` — Loading placeholder card
- `MetaRow` — Reusable icon + text row (DRY for date/time/location)
- `EventCard` — Individual event card
- `EventsPage` — Main page component

## Design Decisions

- **2-column grid (not 3)** — Events have more metadata and longer descriptions than sermons; wider cards improve readability.
- **No click-through detail view** — Events don't have video content; the card already shows all relevant info. Future enhancement if needed.
- **Description truncation** — CSS `WebkitLineClamp: 3` for consistent card heights.

## Success Metrics

| Metric                         | Status                           |
| ------------------------------ | -------------------------------- |
| Page renders at `/events`      | ✅ (needs route in Task 3.4)     |
| Only future events shown       | ✅ (GROQ `date >= now()` filter) |
| Fallback banner on error       | ✅                               |
| Missing images use fallback    | ✅                               |
| All images have alt attributes | ✅                               |
| Empty state renders message    | ✅                               |
