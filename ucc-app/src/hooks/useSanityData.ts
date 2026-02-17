/**
 * Generic data-fetching hook for Sanity CMS content.
 *
 * Wraps `@tanstack/react-query` to provide a consistent, reusable pattern
 * for any GROQ query. Consumers pass a query key (used for cache identity),
 * a GROQ query string, and optional parameters.
 *
 * **Caching strategy — stale-while-revalidate:**
 *   • `staleTime: 5 min` — cached data is served instantly for 5 minutes.
 *   • After 5 min the data is "stale" — React Query silently refetches
 *     in the background and swaps in fresh data when ready.
 *   • `refetchOnWindowFocus: true` — triggers a background refetch when
 *     the user returns to the tab, ensuring content stays fresh (<10 s).
 *
 * **Retry strategy — exponential back-off:**
 *   • Up to 2 retries on failure.
 *   • Delay doubles each attempt (1 s → 2 s), capped at 30 s.
 *
 * **Error observability:**
 *   • Dev-mode: errors are logged to the console for debugging visibility.
 *   • Production: logging is suppressed (guarded by `import.meta.env.DEV`).
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useSanityData<Sermon[]>(
 *   'sermons',
 *   SERMONS_QUERY,
 * );
 * ```
 *
 * @see src/lib/sanityClient.ts  — configured Sanity client
 * @see src/lib/sanityQueries.ts — GROQ query constants
 * @see src/types/sanity.ts      — projected TypeScript interfaces
 */

import { useQuery } from '@tanstack/react-query';
import { client } from '../lib/sanityClient';

// TODO: Sentry integration — replace console.error with Sentry.captureException

/**
 * Fetch any Sanity content with built-in caching, retry, and error logging.
 *
 * @typeParam T - The expected shape of the data returned by the GROQ query.
 * @param queryKey - Unique cache key for React Query (e.g. `'sermons'`).
 * @param query    - GROQ query string to execute against Sanity.
 * @param params   - Optional GROQ parameters (e.g. `{ slug: 'my-post' }`).
 *
 * @returns `{ data, isLoading, error }` — the standard query result triple.
 */
export function useSanityData<T>(
  queryKey: string,
  query: string,
  params?: Record<string, unknown>,
) {
  const result = useQuery<T, Error>({
    /**
     * queryKey is an array so React Query can invalidate / deduplicate
     * requests correctly. Including `params` ensures different parameter
     * sets produce separate cache entries.
     */
    queryKey: [queryKey, params],

    /** The actual fetch — delegates to the pre-configured Sanity client. */
    queryFn: () =>
      params ? client.fetch<T>(query, params) : client.fetch<T>(query),

    // ── Caching ──────────────────────────────────────────────────────
    /** Data is considered "fresh" for 5 minutes before background refetch. */
    staleTime: 5 * 60 * 1000,

    /** Refetch when the user tabs back in — keeps content under 10 s old. */
    refetchOnWindowFocus: true,

    // ── Retry ────────────────────────────────────────────────────────
    /** Retry failed requests up to 2 times before surfacing the error. */
    retry: 2,

    /**
     * Exponential back-off: 1 s → 2 s, capped at 30 s.
     * Prevents hammering the API during transient outages.
     */
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
  });

  // ── Dev-mode error logging ───────────────────────────────────────────
  // Fires on every render where an error exists. Logging in development
  // gives immediate console visibility without polluting production builds.
  if (import.meta.env.DEV && result.error) {
    console.error('[Sanity] Fetch failed:', result.error);
  }

  return {
    data: result.data,
    isLoading: result.isLoading,
    error: result.error,
  };
}
