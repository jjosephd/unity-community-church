import {
  Box,
  Container,
  Typography,
  Skeleton,
  IconButton,
  Modal,
  Fade,
} from '@mui/material';
import { Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSanityData } from '../hooks/useSanityData';
import { MINISTRY_BY_SLUG_QUERY } from '../lib/sanityQueries';
import { urlFor } from '../lib/sanityImageUrl';

/* ── Types ── */

interface GalleryImage {
  url: string;
  alt: string;
  _key: string;
  assetRef: string;
}

interface MinistryData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  featuredImage?: GalleryImage | null;
  gallery?: GalleryImage[] | null;
}

/* ── Helpers ── */

/** Generate optimised WebP URL via Sanity image pipeline. */
const optimizedUrl = (img: GalleryImage, width: number) => {
  try {
    return urlFor({ _ref: img.assetRef, _type: 'reference' })
      .width(width)
      .format('webp')
      .quality(80)
      .url();
  } catch {
    return img.url;
  }
};

/* ── Sub-components ── */

/** Full-screen lightbox with prev/next navigation. */
const Lightbox = memo(
  ({
    images,
    index,
    onClose,
    onPrev,
    onNext,
  }: {
    images: GalleryImage[];
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
  }) => {
    // Keyboard navigation
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, [onClose, onPrev, onNext]);

    const img = images[index];
    if (!img) return null;

    return (
      <Modal open onClose={onClose} closeAfterTransition>
        <Fade in>
          <Box
            sx={{
              position: 'fixed',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1300,
            }}
            onClick={onClose}
          >
            {/* Close */}
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
            >
              <Close />
            </IconButton>

            {/* Previous */}
            {images.length > 1 && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                sx={{
                  position: 'absolute',
                  left: { xs: 8, md: 24 },
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              >
                <ChevronLeft fontSize="large" />
              </IconButton>
            )}

            {/* Image */}
            <Box
              component="img"
              src={optimizedUrl(img, 1400)}
              alt={img.alt || 'Gallery image'}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              sx={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            />

            {/* Next */}
            {images.length > 1 && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                sx={{
                  position: 'absolute',
                  right: { xs: 8, md: 24 },
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            )}

            {/* Counter */}
            <Typography
              sx={{
                position: 'absolute',
                bottom: 20,
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
              }}
            >
              {index + 1} / {images.length}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    );
  },
);
Lightbox.displayName = 'Lightbox';

/* ── Main Page ── */

/**
 * Ministry Gallery Page
 *
 * Renders a ministry's photo gallery driven by Sanity CMS:
 *   - Hero section with featured image (or coverImage fallback)
 *   - Responsive masonry-style grid of gallery images
 *   - Lightbox with keyboard navigation
 */
export const MinistryGalleryPage = memo(() => {
  const { slug } = useParams<{ slug: string }>();
  const { data: ministry, isLoading } = useSanityData<MinistryData>(
    `ministry-${slug}`,
    MINISTRY_BY_SLUG_QUERY,
    { slug },
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /** Combine featured + gallery into a single flat list for the lightbox. */
  const allImages = useMemo(() => {
    const imgs: GalleryImage[] = [];
    if (ministry?.featuredImage) imgs.push(ministry.featuredImage);
    if (ministry?.gallery) imgs.push(...ministry.gallery);
    return imgs;
  }, [ministry]);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + allImages.length) % allImages.length : null,
      ),
    [allImages.length],
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % allImages.length : null,
      ),
    [allImages.length],
  );

  /* ── Loading state ── */
  if (isLoading) {
    return (
      <Box component="main" sx={{ pt: 8 }}>
        <Skeleton
          variant="rectangular"
          sx={{ width: '100%', height: { xs: '40vh', md: '55vh' } }}
        />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Skeleton width="40%" height={48} sx={{ mb: 2 }} />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 2,
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                sx={{ borderRadius: 2, paddingTop: '75%' }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

  /* ── Empty / not found ── */
  if (!ministry) {
    return (
      <Box component="main" sx={{ minHeight: '60vh', pt: 12, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
            Ministry Not Found
          </Typography>
          <Typography color="text.secondary">
            We couldn't find this ministry. It may not have been set up yet in our system.
          </Typography>
        </Container>
      </Box>
    );
  }

  const heroImage = ministry.featuredImage || (ministry.coverImage
    ? { url: ministry.coverImage, alt: ministry.name, _key: 'cover', assetRef: '' }
    : null);

  const galleryImages = ministry.gallery ?? [];

  return (
    <Box component="main" data-testid="ministry-gallery-page">
      {/* ── Hero Section ── */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '45vh', md: '60vh' },
          overflow: 'hidden',
          cursor: heroImage ? 'pointer' : 'default',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.65))',
            pointerEvents: 'none',
          },
        }}
        onClick={() => heroImage && openLightbox(0)}
      >
        {heroImage ? (
          <Box
            component="img"
            src={heroImage.assetRef ? optimizedUrl(heroImage, 1600) : heroImage.url}
            alt={heroImage.alt || ministry.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.4s ease',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: 'primary.main',
              opacity: 0.15,
            }}
          />
        )}

        {/* Title overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 3, md: 6 },
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                letterSpacing: '-0.02em',
              }}
            >
              {ministry.name}
            </Typography>
            {ministry.description && (
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  mt: 1,
                  maxWidth: '700px',
                  textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                }}
              >
                {ministry.description}
              </Typography>
            )}
          </Container>
        </Box>
      </Box>

      {/* ── Gallery Grid ── */}
      {galleryImages.length > 0 && (
        <Box sx={{ bgcolor: 'background.default', py: { xs: 4, md: 8 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Photo Gallery
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: { xs: 1.5, md: 2.5 },
              }}
            >
              {galleryImages.map((img, i) => {
                // Offset by 1 if featured image exists (it's index 0 in allImages)
                const lightboxIdx = ministry.featuredImage ? i + 1 : i;
                return (
                  <Box
                    key={img._key}
                    onClick={() => openLightbox(lightboxIdx)}
                    sx={{
                      position: 'relative',
                      paddingTop: '75%', // 4:3 aspect ratio
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(90, 12, 119, 0.18)',
                        '& .gallery-overlay': { opacity: 1 },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={optimizedUrl(img, 600)}
                      alt={img.alt || `${ministry.name} gallery`}
                      loading="lazy"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    {/* Hover overlay */}
                    <Box
                      className="gallery-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(transparent 50%, rgba(90, 12, 119, 0.35))',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Container>
        </Box>
      )}

      {/* ── Empty gallery state ── */}
      {galleryImages.length === 0 && !heroImage && (
        <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Photos Coming Soon
          </Typography>
          <Typography color="text.secondary">
            We're working on adding photos for {ministry.name}. Check back soon!
          </Typography>
        </Container>
      )}

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </Box>
  );
});

MinistryGalleryPage.displayName = 'MinistryGalleryPage';
