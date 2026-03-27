import { Box, Container, Typography, Skeleton, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { memo, useState, useMemo, useCallback } from 'react';
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

/* ── Main Page ── */

/**
 * Ministry Gallery Page
 * 
 * Layout:
 * - Hero: Traditional top-level hero component.
 * - Standalone: Large active dynamic image display.
 * - Carousel: 3D cascading slide-deck of the gallery.
 */
export const MinistryGalleryPage = memo(() => {
  const { slug } = useParams<{ slug: string }>();
  const { data: ministry, isLoading } = useSanityData<MinistryData>(
    `ministry-${slug}`,
    MINISTRY_BY_SLUG_QUERY,
    { slug },
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const galleryImages = useMemo(() => ministry?.gallery ?? [], [ministry]);

  const prevImage = useCallback(() => {
    setActiveIndex((i) =>
      galleryImages.length > 0 ? (i - 1 + galleryImages.length) % galleryImages.length : 0
    );
  }, [galleryImages.length]);

  const nextImage = useCallback(() => {
    setActiveIndex((i) =>
      galleryImages.length > 0 ? (i + 1) % galleryImages.length : 0
    );
  }, [galleryImages.length]);

  /* ── Loading state ── */
  if (isLoading) {
    return (
      <Box component="main" sx={{ pt: 8 }}>
        <Skeleton variant="rectangular" sx={{ width: '100%', height: { xs: '40vh', md: '55vh' } }} />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Skeleton variant="rectangular" sx={{ width: '100%', height: '50vh', borderRadius: 4, mb: 4 }} />
          <Skeleton variant="rectangular" sx={{ width: '100%', height: '30vh', borderRadius: 4 }} />
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
            We couldn't find this ministry. It may not have been set up yet.
          </Typography>
        </Container>
      </Box>
    );
  }

  const heroImage = ministry.featuredImage || (ministry.coverImage
    ? { url: ministry.coverImage, alt: ministry.name, _key: 'cover', assetRef: '' }
    : null);

  return (
    <Box component="main" data-testid="ministry-gallery-page">
      {/* ── 1. Hero Section ── */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '45vh', md: '60vh' },
          overflow: 'hidden',
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

      {/* ── Gallery Section ── */}
      {galleryImages.length > 0 ? (
        <Box sx={{ bgcolor: 'background.default', pt: { xs: 6, md: 8 }, pb: { xs: 8, md: 12 }, overflow: 'hidden' }}>
          <Container maxWidth="lg">
            
            {/* ── 2. Standalone Dynamic Image ── */}
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                mb: 4,
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Gallery
            </Typography>

            <Box
              sx={{
                width: '100%',
                maxWidth: '900px',
                mx: 'auto',
                aspectRatio: '16/9',
                mb: { xs: 6, md: 10 },
                borderRadius: { xs: 3, md: 4 },
                overflow: 'hidden',
                boxShadow: '0 24px 48px rgba(90, 12, 119, 0.2)',
                position: 'relative',
                bgcolor: '#000',
              }}
            >
              {galleryImages.map((img, i) => (
                <Box
                  key={`standalone-${img._key}`}
                  component="img"
                  src={optimizedUrl(img, 1200)}
                  alt={img.alt || `${ministry.name} standalone image`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: i === activeIndex ? 1 : 0,
                    transform: i === activeIndex ? 'scale(1)' : 'scale(1.05)',
                    transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: i === activeIndex ? 'auto' : 'none',
                  }}
                />
              ))}
            </Box>

            {/* ── 3. Cascading Carousel ── */}
            {galleryImages.length > 1 && (
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '200px', md: '350px' },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  perspective: '1200px',
                }}
              >
                {/* Navigation Buttons */}
                <IconButton
                  onClick={prevImage}
                  sx={{
                    position: 'absolute',
                    left: { xs: -10, sm: 20 },
                    zIndex: 20,
                    bgcolor: 'white',
                    color: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': { bgcolor: 'primary.50' },
                  }}
                >
                  <ChevronLeft fontSize="large" />
                </IconButton>

                <IconButton
                  onClick={nextImage}
                  sx={{
                    position: 'absolute',
                    right: { xs: -10, sm: 20 },
                    zIndex: 20,
                    bgcolor: 'white',
                    color: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': { bgcolor: 'primary.50' },
                  }}
                >
                  <ChevronRight fontSize="large" />
                </IconButton>

                {/* Coverflow Slides */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    maxWidth: '800px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {galleryImages.map((img, i) => {
                    // Calculate distance from active index (handles wrap-around for endless feeling if needed, but here simple offset)
                    let offset = i - activeIndex;
                    
                    // Simple wrap-around logic for visual continuity if there are many images
                    if (offset > galleryImages.length / 2) offset -= galleryImages.length;
                    if (offset < -galleryImages.length / 2) offset += galleryImages.length;

                    const absOffset = Math.abs(offset);
                    const isActive = offset === 0;

                    // Hide slides that are too far away
                    if (absOffset > 3) return null;

                    // CSS Math for Coverflow
                    // translate X based on offset
                    const translateX = offset * 45; // percentage of its own width approx
                    // translate Z pushes it back
                    const translateZ = isActive ? 0 : -absOffset * 100 - 50;
                    // rotate Y tilts it away from center
                    const rotateY = isActive ? 0 : offset > 0 ? -25 : 25;
                    // scale
                    const scale = isActive ? 1 : 1 - (absOffset * 0.1);
                    // opacity
                    const opacity = isActive ? 1 : 1 - (absOffset * 0.25);
                    // zIndex
                    const zIndex = 10 - absOffset;

                    return (
                      <Box
                        key={`carousel-${img._key}`}
                        onClick={() => setActiveIndex(i)}
                        sx={{
                          position: 'absolute',
                          width: { xs: '60%', sm: '45%', md: '40%' },
                          aspectRatio: '4/3',
                          borderRadius: { xs: 2, md: 3 },
                          overflow: 'hidden',
                          boxShadow: isActive 
                            ? '0 16px 32px rgba(90, 12, 119, 0.4)' 
                            : '0 8px 16px rgba(0,0,0,0.2)',
                          cursor: 'pointer',
                          transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                          transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                          opacity,
                          zIndex,
                        }}
                      >
                        <Box
                          component="img"
                          src={optimizedUrl(img, 600)}
                          alt={img.alt || 'Gallery carousel thumbnail'}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            pointerEvents: 'none', // lets click hit the wrapper
                          }}
                        />
                        {/* Overlay to dim background slides */}
                        {!isActive && (
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(0,0,0,0.3)',
                              transition: 'background 0.6s ease',
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Container>
        </Box>
      ) : (
        /* ── Empty gallery state ── */
        !heroImage && (
          <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
              Photos Coming Soon
            </Typography>
            <Typography color="text.secondary">
              We're working on adding photos for {ministry.name}. Check back soon!
            </Typography>
          </Container>
        )
      )}
    </Box>
  );
});

MinistryGalleryPage.displayName = 'MinistryGalleryPage';
