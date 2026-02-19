/**
 * Homepage announcements section — fetches active announcements from Sanity
 * and renders them in a card grid.
 *
 * State handling:
 *  - Loading  → skeleton placeholders
 *  - Error    → renders `fallback` prop (typically BlogSection with hardcoded data)
 *  - Empty    → renders `fallback` prop (section hidden if no announcements)
 *  - Success  → announcement cards ordered by priority
 *
 * Portable Text `body` is extracted as a plain-text excerpt (first text block).
 * Full rich-text rendering is deferred to a future detail page.
 *
 * @see docs/CMS_TASKS.md — Task 3.3
 */

import { type ReactNode, memo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Skeleton,
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { useSanityData } from '../../hooks/useSanityData';
import { ANNOUNCEMENTS_QUERY } from '../../lib/sanityQueries';
import { formatLocalDate } from '../../lib/dateUtils';
import type { Announcement } from '../../types/sanity';

/* ── Helpers ───────────────────────────────────────────────────── */

/** Number of skeleton cards shown during loading. */
const SKELETON_COUNT = 3;

/**
 * Extract a plain-text excerpt from Portable Text body blocks.
 * Takes the first text span from the first block — good enough for card excerpts.
 */
function extractExcerpt(body: unknown[]): string {
  if (!Array.isArray(body) || body.length === 0) return '';
  const firstBlock = body[0] as { children?: { text?: string }[] };
  const spans = firstBlock?.children;
  if (!Array.isArray(spans)) return '';
  return spans.map((s) => s.text ?? '').join('');
}

/* ── Sub-components ────────────────────────────────────────────── */

/** Shimmer placeholder card shown while data loads. */
function AnnouncementSkeleton() {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="40%" sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  );
}

/** Single announcement card. */
const AnnouncementCard = memo(
  ({ announcement }: { announcement: Announcement }) => {
    const excerpt = extractExcerpt(announcement.body);

    return (
      <Card
        data-testid={`announcement-${announcement._id}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          transition:
            'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          contain: 'layout style paint',
          '&:hover': {
            transform: 'translate3d(0, -6px, 0)',
            boxShadow: '0 12px 40px rgba(90, 12, 119, 0.12)',
            borderColor: 'primary.light',
          },
        }}
      >
        <CardContent
          sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 1.5,
              fontSize: '1.25rem',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {announcement.title}
          </Typography>

          {excerpt && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                lineHeight: 1.7,
                flexGrow: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {excerpt}
            </Typography>
          )}

          {/* Publish date */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
            }}
          >
            <CalendarToday fontSize="small" />
            <Typography variant="caption">
              {formatLocalDate(announcement.publishDate, 'MMM d, yyyy')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  },
);

AnnouncementCard.displayName = 'AnnouncementCard';

/* ── Main Section ──────────────────────────────────────────────── */

interface AnnouncementsSectionProps {
  /** Rendered when Sanity is unreachable or no announcements exist. */
  fallback?: ReactNode;
}

export const AnnouncementsSection = memo(
  ({ fallback = null }: AnnouncementsSectionProps) => {
    const {
      data: announcements,
      isLoading,
      error,
    } = useSanityData<Announcement[]>('announcements', ANNOUNCEMENTS_QUERY);

    // Error → show fallback (silently degrade on homepage — no banner)
    if (error) return <>{fallback}</>;

    // Empty (after load completes) → show fallback or hide entirely
    if (!isLoading && (!announcements || announcements.length === 0)) {
      return <>{fallback}</>;
    }

    return (
      <Box
        component="section"
        data-testid="announcements-section"
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                color: 'primary.main',
                mb: 1,
                letterSpacing: '-0.01em',
              }}
            >
              Announcements
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.1rem' }}
            >
              Stay informed about what's happening at our church
            </Typography>
          </Box>

          {/* Loading State */}
          {isLoading && (
            <Grid container spacing={4}>
              {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <Grid size={{ xs: 12, md: 4 }} key={i}>
                  <AnnouncementSkeleton />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Success State */}
          {!isLoading && announcements && announcements.length > 0 && (
            <Grid container spacing={4}>
              {announcements.map((a) => (
                <Grid size={{ xs: 12, md: 4 }} key={a._id}>
                  <AnnouncementCard announcement={a} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    );
  },
);

AnnouncementsSection.displayName = 'AnnouncementsSection';
