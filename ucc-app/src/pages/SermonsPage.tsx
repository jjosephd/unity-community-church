import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  type SelectChangeEvent,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { memo, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useSanityData } from '../hooks/useSanityData';
import { SERMONS_QUERY } from '../lib/sanityQueries';
import { DEFAULT_SERMON_THUMBNAIL } from '../lib/sanityImageUrl';
import { ContentFallbackBanner } from '../components/common/ContentFallbackBanner';
import type { Sermon } from '../types/sanity';

/* ── Constants ─────────────────────────────────────────────────── */

const ALL_SPEAKERS = 'all';

/** Number of skeleton cards shown during loading. */
const SKELETON_COUNT = 6;

/* ── Helpers ───────────────────────────────────────────────────── */

/** Returns an embeddable URL for YouTube or Facebook video links. */
function getEmbedUrl(videoUrl: string): string | null {
  // YouTube: youtube.com/watch?v=ID or youtu.be/ID
  const ytMatch = videoUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Facebook: any facebook.com video URL → use Facebook embed plugin
  if (videoUrl.includes('facebook.com')) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false`;
  }

  return null;
}

/* ── Sub-components ────────────────────────────────────────────── */

/** Shimmer placeholder card shown while data loads. */
function SermonSkeleton() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Skeleton variant="rectangular" height={200} animation="wave" />
      <CardContent>
        <Skeleton width="80%" height={28} />
        <Skeleton width="50%" height={20} sx={{ mt: 1 }} />
        <Skeleton width="40%" height={20} sx={{ mt: 0.5 }} />
      </CardContent>
    </Card>
  );
}

/** Single sermon card. */
function SermonCard({
  sermon,
  onSelect,
}: {
  sermon: Sermon;
  onSelect: (s: Sermon) => void;
}) {
  return (
    <Card
      onClick={() => onSelect(sermon)}
      sx={{
        cursor: 'pointer',
        borderRadius: 3,
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
        height={200}
        image={sermon.thumbnailUrl || DEFAULT_SERMON_THUMBNAIL}
        alt={sermon.thumbnailAlt || sermon.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1.3 }}
        >
          {sermon.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(sermon.date), 'MMMM d, yyyy')}
        </Typography>
        <Chip
          label={sermon.speaker}
          size="small"
          sx={{
            mt: 1,
            backgroundColor: 'rgba(90, 12, 119, 0.08)',
            color: 'primary.main',
            fontWeight: 500,
          }}
        />
      </CardContent>
    </Card>
  );
}

/** Modal detail view with embedded video player. */
function SermonDetailDialog({
  sermon,
  open,
  onClose,
}: {
  sermon: Sermon | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!sermon) return null;

  const embedUrl = sermon.videoUrl ? getEmbedUrl(sermon.videoUrl) : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="sermon-detail-title"
    >
      <DialogTitle
        id="sermon-detail-title"
        sx={{ pr: 6, fontWeight: 700, color: 'primary.main' }}
      >
        {sermon.title}
        <IconButton
          aria-label="Close sermon detail"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Video player */}
        {embedUrl && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9 aspect ratio
              mb: 3,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <iframe
              src={embedUrl}
              title={`Video: ${sermon.title}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </Box>
        )}

        {/* Sermon metadata */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body1">
            <strong>Speaker:</strong> {sermon.speaker}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong>{' '}
            {format(new Date(sermon.date), 'MMMM d, yyyy')}
          </Typography>
          {sermon.scripture && (
            <Typography variant="body1">
              <strong>Scripture:</strong> {sermon.scripture}
            </Typography>
          )}
        </Box>

        {/* Fallback if no video */}
        {!embedUrl && sermon.videoUrl && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Video available at:{' '}
            <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer">
              {sermon.videoUrl}
            </a>
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ── Main Page ─────────────────────────────────────────────────── */

/**
 * Sermons listing page — fetches from Sanity and renders as a card grid.
 *
 * States handled: Loading | Error | Empty | Success
 * Features: Speaker dropdown filter, modal detail view with video player.
 *
 * @see docs/tasks/TASK_3_1_SERMONS_PAGE.md
 */
export const SermonsPage = memo(() => {
  const {
    data: sermons,
    isLoading,
    error,
  } = useSanityData<Sermon[]>('sermons', SERMONS_QUERY);

  const [selectedSpeaker, setSelectedSpeaker] = useState(ALL_SPEAKERS);
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  /* Derive unique speakers from data for the filter dropdown. */
  const speakers = useMemo(() => {
    if (!sermons) return [];
    const unique = [...new Set(sermons.map((s) => s.speaker))];
    return unique.sort();
  }, [sermons]);

  /* Apply speaker filter. */
  const filteredSermons = useMemo(() => {
    if (!sermons) return [];
    if (selectedSpeaker === ALL_SPEAKERS) return sermons;
    return sermons.filter((s) => s.speaker === selectedSpeaker);
  }, [sermons, selectedSpeaker]);

  const handleSpeakerChange = (e: SelectChangeEvent) => {
    setSelectedSpeaker(e.target.value);
  };

  /* ── Render ─────────────────────────────────────────────────── */

  return (
    <Box
      component="main"
      data-testid="sermons-page"
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
            Sermons
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
            Watch and listen to messages from our Sunday services. Be inspired
            by God&apos;s Word.
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
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SermonSkeleton key={i} />
            ))}
          </Box>
        )}

        {/* ── Empty State ──────────────────────────────────────── */}
        {!isLoading && !error && sermons && sermons.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              No sermons available yet. Check back after Sunday service.
            </Typography>
          </Box>
        )}

        {/* ── Success State ────────────────────────────────────── */}
        {!isLoading && !error && sermons && sermons.length > 0 && (
          <>
            {/* Speaker filter */}
            {speakers.length > 1 && (
              <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Select
                  value={selectedSpeaker}
                  onChange={handleSpeakerChange}
                  size="small"
                  displayEmpty
                  aria-label="Filter sermons by speaker"
                  sx={{
                    minWidth: 200,
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value={ALL_SPEAKERS}>All Speakers</MenuItem>
                  {speakers.map((speaker) => (
                    <MenuItem key={speaker} value={speaker}>
                      {speaker}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}

            {/* Card grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {filteredSermons.map((sermon) => (
                <SermonCard
                  key={sermon._id}
                  sermon={sermon}
                  onSelect={setActiveSermon}
                />
              ))}
            </Box>
          </>
        )}

        {/* Detail dialog */}
        <SermonDetailDialog
          sermon={activeSermon}
          open={activeSermon !== null}
          onClose={() => setActiveSermon(null)}
        />
      </Container>
    </Box>
  );
});

SermonsPage.displayName = 'SermonsPage';
