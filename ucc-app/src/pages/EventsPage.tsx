import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Chip,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Autorenew as RecurringIcon,
} from '@mui/icons-material';
import { memo } from 'react';
import { format } from 'date-fns';
import { useSanityData } from '../hooks/useSanityData';
import { EVENTS_QUERY } from '../lib/sanityQueries';
import { DEFAULT_EVENT_IMAGE, urlFor } from '../lib/sanityImageUrl';
import { ContentFallbackBanner } from '../components/common/ContentFallbackBanner';
import type { Event } from '../types/sanity';

/* ── Constants ─────────────────────────────────────────────────── */

/** Number of skeleton cards shown during loading. */
const SKELETON_COUNT = 4;

/* ── Sub-components ────────────────────────────────────────────── */

/** Shimmer placeholder card shown while data loads. */
function EventSkeleton() {
  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Skeleton variant="rectangular" height={120} animation="wave" />
      <CardContent>
        <Skeleton width="70%" height={28} />
        <Skeleton width="50%" height={20} sx={{ mt: 1 }} />
        <Skeleton width="40%" height={20} sx={{ mt: 0.5 }} />
        <Skeleton width="90%" height={18} sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
}

/** Metadata row with icon + text. */
function MetaRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      {icon}
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}

/** Single event card. */
function EventCard({ event }: { event: Event }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(90, 12, 119, 0.12)',
        },
      }}
    >
      <CardMedia
        component="img"
        height={120}
        image={
          event.image
            ? urlFor(event.image).height(120).fit('crop').url()
            : DEFAULT_EVENT_IMAGE
        }
        alt={event.image?.alt || event.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Title + recurring badge */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, lineHeight: 1.3, color: 'primary.main' }}
          >
            {event.title}
          </Typography>
          {event.isRecurring && (
            <Chip
              icon={<RecurringIcon sx={{ fontSize: 16 }} />}
              label="Recurring"
              size="small"
              sx={{
                flexShrink: 0,
                backgroundColor: 'rgba(90, 12, 119, 0.08)',
                color: 'primary.main',
                fontWeight: 500,
              }}
            />
          )}
        </Box>

        {/* Metadata */}
        <MetaRow
          icon={<CalendarIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
          text={format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
        />
        {event.time && (
          <MetaRow
            icon={<TimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
            text={event.time}
          />
        )}
        {event.location && (
          <MetaRow
            icon={<LocationIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
            text={event.location}
          />
        )}

        {/* Description */}
        {event.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.6,
            }}
          >
            {event.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

/* ── Main Page ─────────────────────────────────────────────────── */

/**
 * Events listing page — fetches future events from Sanity and renders
 * as a responsive card grid.
 *
 * States handled: Loading | Error | Empty | Success
 * Future events only (filtered by GROQ query).
 *
 * @see docs/tasks/TASK_3_2_EVENTS_PAGE.md
 */
export const EventsPage = memo(() => {
  const {
    data: events,
    isLoading,
    error,
  } = useSanityData<Event[]>('events', EVENTS_QUERY);

  return (
    <Box
      component="main"
      data-testid="events-page"
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              letterSpacing: '-0.01em',
            }}
          >
            Upcoming Events
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Join us for worship, fellowship, and community gatherings. There's
            always something happening at Unity Community Church.
          </Typography>
        </Box>

        {/* ── Error State ──────────────────────────────────────── */}
        {error && <ContentFallbackBanner />}

        {/* ── Loading State ────────────────────────────────────── */}
        {isLoading && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
              },
              gap: 3,
            }}
          >
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </Box>
        )}

        {/* ── Empty State ──────────────────────────────────────── */}
        {!isLoading && !error && events && events.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              No upcoming events. Stay tuned for what&apos;s next!
            </Typography>
          </Box>
        )}

        {/* ── Success State ────────────────────────────────────── */}
        {!isLoading && !error && events && events.length > 0 && (
          <Box
            sx={{
              display: events.length === 1 ? 'flex' : 'grid',
              justifyContent: events.length === 1 ? 'center' : 'unset',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
              },
              gap: 3,
            }}
          >
            {events.map((event) => (
              <Box
                key={event._id}
                sx={{
                  width: '100%',
                  maxWidth: events.length === 1 ? '600px' : 'none',
                }}
              >
                <EventCard event={event} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
});

EventsPage.displayName = 'EventsPage';
