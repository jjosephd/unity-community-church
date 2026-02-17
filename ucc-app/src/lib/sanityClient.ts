/**
 * Configured Sanity client for read-only CDN access.
 *
 * Reads `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` from Vite env vars.
 * Dataset defaults to "production" if unset.
 *
 * @see https://www.sanity.io/docs/js-client
 */
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-02-17',
  useCdn: true,
});
