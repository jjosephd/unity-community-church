/**
 * Sanity CMS domain models — TypeScript interfaces for GROQ query projections.
 *
 * These represent the PROJECTED shapes returned by GROQ queries,
 * not raw Sanity documents. Image fields are flattened (e.g. thumbnailUrl
 * instead of nested asset references) because the GROQ queries project
 * them into these shapes.
 *
 * @see sanity/schemaTypes/ for the source Sanity schemas
 * @see src/lib/sanityQueries.ts for the GROQ projections (Task 2.4)
 */

/** Shared base for all Sanity document types. */
export interface SanityDocument {
  _id: string;
}

/** A sermon record as projected by SERMONS_QUERY. */
export interface Sermon extends SanityDocument {
  title: string;
  date: string;
  speaker: string;
  scripture?: string;
  videoUrl?: string;
  thumbnail?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
}

/** An event record as projected by EVENTS_QUERY. */
export interface Event extends SanityDocument {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  isRecurring?: boolean;
}

/** An announcement record as projected by ANNOUNCEMENTS_QUERY. */
export interface Announcement extends SanityDocument {
  title: string;
  body: unknown[]; // Portable Text blocks — concrete types deferred to rendering
  publishDate: string;
  expiryDate?: string;
  priority?: number;
}

/**
 * Global site configuration (singleton).
 *
 * Uses a fixed document ID ("siteSettings") — queried by ID, not by _type.
 * No _id needed at the consumer level since there is exactly one instance.
 */
export interface SiteSettings {
  churchName: string;
  address: string;
  phone: string;
  email: string;
  serviceTimes: { day: string; time: string }[];
}
