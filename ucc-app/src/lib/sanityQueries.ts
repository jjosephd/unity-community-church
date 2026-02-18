/**
 * GROQ queries for fetching Sanity CMS content.
 *
 * Each query uses an explicit `_type` filter (or fixed `_id` for singletons)
 * and projects only the fields needed by the frontend TypeScript interfaces.
 * Image fields are fully dereferenced via `asset->url` so consumers receive
 * plain URL strings instead of Sanity asset references.
 *
 * @see src/types/sanity.ts for the projected TypeScript interfaces
 * @see sanity/schemaTypes/ for the source Sanity schemas
 */

/**
 * Fetches all sermons, newest first.
 *
 * Projects image fields via `thumbnail.asset->url` to flatten the
 * Sanity asset reference into a direct URL string.
 */
export const SERMONS_QUERY = `
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    date,
    speaker,
    scripture,
    videoUrl,
    "thumbnailUrl": thumbnail.asset->url,
    "thumbnailAlt": thumbnail.alt
  }
`;

/**
 * Fetches future events only, ordered by date ascending (soonest first).
 *
 * The `date >= now()` filter ensures past events are excluded automatically.
 */
export const EVENTS_QUERY = `
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    date,
    time,
    location,
    description,
    description,
    image,
    isRecurring
  }
`;

/**
 * Fetches active announcements — those with no expiry or a future expiry.
 *
 * Ordered by priority (highest first), then by publish date (newest first).
 */
export const ANNOUNCEMENTS_QUERY = `
  *[_type == "announcement" && (!defined(expiryDate) || expiryDate >= now())]
    | order(priority desc, publishDate desc) {
    _id,
    title,
    body,
    publishDate,
    expiryDate,
    priority
  }
`;

/**
 * Fetches the singleton site-settings document by its fixed ID.
 *
 * Returns exactly one object (or null) — no array wrapping.
 */
export const SITE_SETTINGS_QUERY = `
  *[_id == "siteSettings"][0] {
    churchName,
    address,
    phone,
    email,
    serviceTimes[] {
      day,
      time
    }
  }
`;
