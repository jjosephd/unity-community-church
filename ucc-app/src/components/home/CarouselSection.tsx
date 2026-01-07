import { useState, useCallback, useEffect, memo } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import type { CarouselSlide } from '../../types/home';

interface CarouselSectionProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}

/**
 * Optimized Carousel Component
 * Features:
 * - Smooth CSS transitions (GPU accelerated)
 * - Auto-play with pause on hover
 * - Touch/swipe support ready
 * - Indicator dots
 * - Specific property transitions to reduce lag
 */
export const CarouselSection = memo(
  ({ slides, autoPlayInterval = 6000 }: CarouselSectionProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goToSlide = useCallback((index: number) => {
      setActiveIndex(index);
    }, []);

    const goToPrevious = useCallback(() => {
      setActiveIndex((current) =>
        current === 0 ? slides.length - 1 : current - 1
      );
    }, [slides.length]);

    const goToNext = useCallback(() => {
      setActiveIndex((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, [slides.length]);

    useEffect(() => {
      if (isPaused || slides.length <= 1) return;
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }, [isPaused, goToNext, autoPlayInterval, slides.length]);

    if (slides.length === 0) return null;

    const currentSlide = slides[activeIndex];

    return (
      <Box
        component="section"
        data-testid="carousel-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 800,
                color: 'primary.main',
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              Unity Community Church
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 4,
                backgroundColor: 'primary.main',
                mx: 'auto',
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Modern Carousel Container */}
          <Box
            sx={{
              maxWidth: '900px',
              mx: 'auto',
              backgroundColor: 'white',
              borderRadius: { xs: 3, md: 4 },
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(90, 12, 119, 0.1)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            {/* Image Area - Compact and Centered */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: { xs: '50%', md: '35%' },
                backgroundColor: '#f8f9fa',
                overflow: 'hidden',
              }}
            >
              {slides.map((slide, index) => (
                <Box
                  key={slide.id}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: index === activeIndex ? 1 : 0,
                    visibility: index === activeIndex ? 'visible' : 'hidden',
                    transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={slide.image}
                    alt={slide.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>
              ))}

              {/* Navigation Arrows Integrated in Image Area */}
              <IconButton
                onClick={goToPrevious}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'primary.main',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '&:hover': { backgroundColor: 'white' },
                  zIndex: 10,
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={goToNext}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'primary.main',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '&:hover': { backgroundColor: 'white' },
                  zIndex: 10,
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>

            {/* Content Area - Cleanly Below */}
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                backgroundColor: 'white',
                borderTop: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <Box
                key={activeIndex} // Triggers animation on change
                sx={{
                  animation:
                    'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    fontWeight: 800,
                    color: 'text.primary',
                    mb: 2,
                  }}
                >
                  {currentSlide.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    color: 'text.secondary',
                    maxWidth: '800px',
                    mx: 'auto',
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  {currentSlide.subtitle}
                </Typography>

                {currentSlide.cta && (
                  <Button
                    component={Link}
                    to={currentSlide.cta.link}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 6,
                      py: 1.8,
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      backgroundColor: 'primary.main',
                      boxShadow: '0 10px 30px rgba(90, 12, 119, 0.2)',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    {currentSlide.cta.text}
                  </Button>
                )}
              </Box>

              {/* Indicator Dots Below CTA */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1.5,
                  mt: 6,
                }}
              >
                {slides.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => goToSlide(index)}
                    sx={{
                      width: index === activeIndex ? 30 : 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor:
                        index === activeIndex
                          ? 'primary.main'
                          : 'rgba(90, 12, 119, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
);

CarouselSection.displayName = 'CarouselSection';
