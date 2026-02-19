import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Chip,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Autorenew as RecurringIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { memo, useMemo, useState, useCallback } from 'react';
import { useSanityData } from '../hooks/useSanityData';
import { EVENTS_QUERY } from '../lib/sanityQueries';
import { DEFAULT_EVENT_IMAGE, urlFor } from '../lib/sanityImageUrl';
import { formatLocalDate } from '../lib/dateUtils';
import { ContentFallbackBanner } from '../components/common/ContentFallbackBanner';
import type { Event } from '../types/sanity';

/* ── Constants ─────────────────────────────────────────────────── */

const CARD_BG = 'rgba(255, 255, 255, 0.7)';
const PAGE_BG = 'rgb(253, 248, 243)';

/* ── Sub-components ────────────────────────────────────────────── */

/** Shimmer placeholder card shown while data loads. */
function EventSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: CARD_BG,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Skeleton
        variant="rectangular"
        height={featured ? 300 : 120}
        animation="wave"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton width="80%" height={28} sx={{ mb: 1 }} />
        <Skeleton width="50%" height={20} sx={{ mb: 1 }} />
        <Skeleton width="90%" height={featured ? 60 : 20} />
      </CardContent>
    </Card>
  );
}

/** Metadata row for cards. */
function MetaRow({
  icon,
  text,
  color = 'text.secondary',
}: {
  icon: React.ReactNode;
  text: string;
  color?: string;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography variant="body2" sx={{ color, fontWeight: 500 }}>
        {text}
      </Typography>
    </Box>
  );
}

/** Large featured card for the center column. */
function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: CARD_BG,
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(90, 12, 119, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 40px rgba(90, 12, 119, 0.15)',
          '& .featured-image': {
            transform: 'scale(1.02)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={
            event.image
              ? urlFor(event.image).height(400).width(800).fit('crop').url()
              : DEFAULT_EVENT_IMAGE
          }
          alt={event.image?.alt || event.title}
          className="featured-image"
          sx={{
            height: { xs: 240, md: 400 },
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
        {event.isRecurring && (
          <Chip
            icon={<RecurringIcon sx={{ fontSize: 16 }} />}
            label="Recurring"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          />
        )}
      </Box>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography
          variant="h3"
          sx={{
            color: 'primary.main',
            mb: 2,
            fontSize: { xs: '1.5rem', md: '2.25rem' },
            lineHeight: 1.2,
          }}
        >
          {event.title}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <MetaRow
              icon={
                <CalendarIcon sx={{ fontSize: 20, color: 'primary.main' }} />
              }
              text={formatLocalDate(event.date, 'EEEE, MMMM d, yyyy')}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {event.time && (
              <MetaRow
                icon={<TimeIcon sx={{ fontSize: 20, color: 'primary.main' }} />}
                text={event.time}
              />
            )}
          </Grid>
          {event.location && (
            <Grid size={{ xs: 12 }}>
              <MetaRow
                icon={
                  <LocationIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                }
                text={event.location}
              />
            </Grid>
          )}
        </Grid>

        {event.description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
              fontSize: '1.1rem',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {event.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

/** Smaller card for the sidebars. */
function SidebarEventCard({
  event,
  onClick,
}: {
  event: Event;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: CARD_BG,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          transform: 'translateX(4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.1rem',
              color: 'primary.main',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.3,
              minHeight: '2.6em',
            }}
          >
            {event.title}
          </Typography>
          {event.isRecurring && (
            <Chip
              icon={<RecurringIcon sx={{ fontSize: 12 }} />}
              label="Recurring"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                backgroundColor: 'rgba(90, 12, 119, 0.08)',
                color: 'primary.main',
                fontWeight: 700,
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <MetaRow
            icon={
              <CalendarIcon
                sx={{ fontSize: 16, color: 'primary.main', opacity: 0.8 }}
              />
            }
            text={formatLocalDate(event.date, 'MMM d')}
          />
          {event.time && (
            <MetaRow
              icon={
                <TimeIcon
                  sx={{ fontSize: 16, color: 'primary.main', opacity: 0.8 }}
                />
              }
              text={event.time}
            />
          )}
        </Box>

        <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
          <ChevronRightIcon sx={{ color: 'primary.main', opacity: 0.5 }} />
        </Box>
      </CardContent>
    </Card>
  );
}

/* ── Main Page ─────────────────────────────────────────────────── */

export const EventsPage = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    data: events,
    isLoading,
    error,
  } = useSanityData<Event[]>('events', EVENTS_QUERY);

  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  // Sorting logic for the feed
  const { featured, explore, weekly } = useMemo(() => {
    if (!events) return { featured: null, explore: [], weekly: [] };

    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // If no active ID, pick the first sorted event
    const featured =
      sortedEvents.find((e) => e._id === activeEventId) || sortedEvents[0];

    // Sidebar should exclude the currently featured event
    const others = sortedEvents.filter((e) => e._id !== featured?._id);
    const weekly = others.filter((e) => e.isRecurring);
    const explore = others.filter((e) => !e.isRecurring);

    return { featured, explore, weekly };
  }, [events, activeEventId]);

  const handleSelectEvent = useCallback((id: string) => {
    setActiveEventId(id);
    // Smooth scroll to top on selection for better UX
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }, []);

  return (
    <Box
      component="main"
      data-testid="events-page"
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        backgroundColor: PAGE_BG,
      }}
    >
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: 'primary.main',
              mb: 2,
            }}
          >
            Community Feed
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              color: 'text.secondary',
              fontSize: '1.1rem',
              fontWeight: 500,
            }}
          >
            Stay connected with the heartbeat of Unity Community Church.
            Upcoming gatherings, recurring workshops, and special moments.
          </Typography>
        </Box>

        {error && <ContentFallbackBanner />}

        {isLoading && (
          <Grid container spacing={3}>
            {!isMobile && (
              <Grid size={{ xs: 12, md: 3 }}>
                <EventSkeleton />
              </Grid>
            )}
            <Grid size={{ xs: 12, md: 6 }}>
              <EventSkeleton featured />
            </Grid>
            {!isMobile && (
              <Grid size={{ xs: 12, md: 3 }}>
                <EventSkeleton />
              </Grid>
            )}
          </Grid>
        )}

        {!isLoading && !error && events && events.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography variant="h5" color="text.secondary">
              No upcoming events found. Check back soon!
            </Typography>
          </Box>
        )}

        {!isLoading && !error && featured && (
          <Grid container spacing={4}>
            {/* Explore More - Left Sidebar (Upcoming Non-Recurring) */}
            <Grid size={{ xs: 12, md: 3 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Typography
                variant="h6"
                sx={{ mb: 3, opacity: 0.8, letterSpacing: '0.1em' }}
              >
                Explore More
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {explore.length > 0 ? (
                  explore.map((event) => (
                    <SidebarEventCard
                      key={event._id}
                      event={event}
                      onClick={() => handleSelectEvent(event._id)}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.disabled">
                    No other special events scheduled.
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* The Feed - Center Column (Featured/Latest) */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  opacity: 0.8,
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                }}
              >
                The Hub
              </Typography>
              <FeaturedEventCard event={featured} />
            </Grid>

            {/* Weekly Path - Right Sidebar (Recurring) */}
            <Grid size={{ xs: 12, md: 3 }} sx={{ order: { xs: 3, md: 3 } }}>
              <Typography
                variant="h6"
                sx={{ mb: 3, opacity: 0.8, letterSpacing: '0.1em' }}
              >
                Weekly Path
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {weekly.length > 0 ? (
                  weekly.map((event) => (
                    <SidebarEventCard
                      key={event._id}
                      event={event}
                      onClick={() => handleSelectEvent(event._id)}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.disabled">
                    Check our site settings for regular service times.
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
});

EventsPage.displayName = 'EventsPage';
