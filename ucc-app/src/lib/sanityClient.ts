/**
 * Configured Sanity client for read-only CDN access.
 *
 * Reads `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` from Vite env vars.
 * Dataset defaults to "production" if unset.
 *
 * @see https://www.sanity.io/docs/js-client
 */
import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

if (!projectId) {
  console.error(
    'Sanity Project ID is not set. Check your environment variables.',
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-17',
  useCdn: true,
});
