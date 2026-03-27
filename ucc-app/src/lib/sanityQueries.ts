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
    thumbnail
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

/**
 * Fetches all leadership groups, ordered by their display order.
 * Projects member profile images to direct URLs.
 */
export const LEADERSHIP_GROUPS_QUERY = `
  *[_type == "leadershipGroup"] | order(order asc) {
    _id,
    title,
    description,
    "id": _id,
    members[] {
      name,
      role,
      "image": image.asset->url,
      bio
    }
  }
`;




/**
 * Fetches the singleton aboutPage document by its fixed ID.
 */
export const ABOUT_PAGE_QUERY = `
  *[_id == "aboutPage"][0] {
    "slideshowImages": slideshowImages[].asset->url
  }
`;

/**
 * Fetches the singleton homepageSlideshow document.
 *
 * Returns images with direct URLs, alt text, and asset references
 * so the frontend can use the urlFor() builder for responsive sizing.
 * Also includes the praise-team video URL for the homepage video section.
 */
export const HOMEPAGE_SLIDESHOW_QUERY = `
  *[_id == "homepageSlideshow"][0] {
    "images": images[] {
      "url": asset->url,
      "alt": alt,
      "_key": _key,
      "assetRef": asset._ref
    },
    praiseTeamVideoUrl
  }
`;

/**
 * Fetches the singleton communityImpact document.
 * Returns an array of impact cards with flattened image URLs.
 */
export const COMMUNITY_IMPACT_QUERY = `
  *[_id == "communityImpact"][0] {
    "items": items[] {
      title,
      description,
      "image": image.asset->url,
      "_key": _key
    }
  }
`;

/**
 * Fetches all ministries — name, slug, and cover image only.
 * Used for listing / navigation purposes.
 */
export const MINISTRIES_LIST_QUERY = `
  *[_type == "ministry"] | order(name asc) {
    _id,
    name,
    slug,
    "coverImage": coverImage.asset->url,
    description
  }
`;

/**
 * Fetches a single ministry by its slug.
 * Returns full gallery data including featured image and gallery images.
 */
export const MINISTRY_BY_SLUG_QUERY = `
  *[_type == "ministry" && slug == $slug][0] {
    _id,
    name,
    slug,
    description,
    "coverImage": coverImage.asset->url,
    "featuredImage": featuredImage {
      "url": asset->url,
      "alt": alt,
      "assetRef": asset._ref
    },
    "gallery": gallery[] {
      "url": asset->url,
      "alt": alt,
      "_key": _key,
      "assetRef": asset._ref
    }
  }
`;

