/**
 * Sanity image URL builder and fallback image constants.
 *
 * Uses the shared Sanity client so project/dataset config stays DRY.
 * Call `urlFor(source).width(400).url()` to generate a transformed image URL.
 *
 * @see https://www.sanity.io/docs/image-url
 */
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

import { client } from './sanityClient';

const builder = createImageUrlBuilder(client);

/** Returns an image URL builder for the given Sanity image source. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* ── Fallback image paths (served from public/) ── */

export const DEFAULT_SERMON_THUMBNAIL = '/images/default-sermon.jpg';
export const DEFAULT_EVENT_IMAGE = '/images/default-event.jpg';
