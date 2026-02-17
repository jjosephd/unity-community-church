/**
 * Graceful-degradation banner shown when Sanity content is unavailable.
 *
 * Renders a themed MUI `<Alert>` with `severity="info"`. The built-in
 * MUI Alert already provides `role="alert"` for accessibility.
 *
 * @example
 * ```tsx
 * // Default message
 * <ContentFallbackBanner />
 *
 * // Custom message
 * <ContentFallbackBanner message="Events are loading — check back soon." />
 * ```
 */

import Alert from '@mui/material/Alert';

interface ContentFallbackBannerProps {
  /** Override the default user-facing message. */
  message?: string;
}

const DEFAULT_MESSAGE =
  'Content temporarily unavailable. Please try again shortly.';

export function ContentFallbackBanner({
  message = DEFAULT_MESSAGE,
}: ContentFallbackBannerProps) {
  return (
    <Alert severity="info" sx={{ mx: 2, my: 3 }}>
      {message}
    </Alert>
  );
}
