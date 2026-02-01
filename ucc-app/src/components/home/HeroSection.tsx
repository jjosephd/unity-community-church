import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { memo, useState, useEffect } from 'react';

const heroImages = ['/images/ucc1.png', '/images/ucc2.png', '/images/ucc3.jpg'];

/**
 * Hero Section Component
 * Features:
 * - 2-column layout (text left, image carousel right)
 * - Auto-rotating image carousel
 * - Responsive (stacks on mobile)
 * - Smooth transitions
 */
export const HeroSection = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      component="section"
      data-testid="hero-section"
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
        py: { xs: 8, md: 0 },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* Left Column - Text Content */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: 'center', md: 'left' },
              order: { xs: 2, md: 1 },
            }}
          >
            {/* Main Heading */}
            <Typography
              variant="h1"
              component="h1"
              data-testid="hero-title"
              sx={{
                fontSize: {
                  xs: '2.25rem',
                  sm: '3rem',
                  md: '3.5rem',
                  lg: '4rem',
                },
                fontWeight: 800,
                color: 'text.primary',
                mb: 3,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Where there's unity, there's always{' '}
              <Box
                component="span"
                sx={{
                  background:
                    'linear-gradient(90deg, #5A0C77 0%, #8B2FC9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Victory!
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h5"
              component="p"
              data-testid="hero-subtitle"
              sx={{
                fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                fontWeight: 400,
                color: 'text.secondary',
                mb: 5,
                maxWidth: { md: '500px' },
                lineHeight: 1.6,
              }}
            >
              Unity Community Church - Powhatan. Join our welcoming community
              where faith grows and lives are transformed.
            </Typography>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Button
                component={Link}
                to="/visit"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                data-testid="hero-cta-primary"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: 'primary.main',
                  borderRadius: '50px',
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(90, 12, 119, 0.25)',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(90, 12, 119, 0.35)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Plan Your Visit
              </Button>

              <Button
                component={Link}
                to="/events"
                variant="outlined"
                size="large"
                data-testid="hero-cta-secondary"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  borderRadius: '50px',
                  borderWidth: 2,
                  textTransform: 'none',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: 'primary.dark',
                    backgroundColor: 'rgba(90, 12, 119, 0.04)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Upcoming Events
              </Button>
            </Stack>
          </Box>

          {/* Right Column - Image Carousel */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 1, md: 2 },
              width: '100%',
              maxWidth: { xs: '100%', md: '50%' },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: { xs: '100%', md: '110%' }, // Taller ratio to fit images
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(90, 12, 119, 0.15)',
              }}
            >
              {/* Images */}
              {heroImages.map((image, index) => (
                <Box
                  key={image}
                  component="img"
                  src={image}
                  alt={`Unity Community Church ${index + 1}`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: index === activeIndex ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                  }}
                />
              ))}

              {/* Indicator Dots */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                }}
              >
                {heroImages.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    sx={{
                      width: index === activeIndex ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor:
                        index === activeIndex
                          ? 'white'
                          : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

HeroSection.displayName = 'HeroSection';
