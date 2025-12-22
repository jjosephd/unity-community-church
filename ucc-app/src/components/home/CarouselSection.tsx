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
  ({ slides, autoPlayInterval = 5000 }: CarouselSectionProps) => {
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

    // Auto-play effect
    useEffect(() => {
      if (isPaused || slides.length <= 1) return;

      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }, [isPaused, goToNext, autoPlayInterval, slides.length]);

    if (slides.length === 0) return null;

    return (
      <Box
        component="section"
        data-testid="carousel-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'background.paper',
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
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
                letterSpacing: '-0.01em',
              }}
            >
              Unity Community Church
            </Typography>
          </Box>

          {/* Carousel Container */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(90, 12, 119, 0.15)',
            }}
          >
            {/* Slides */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: { xs: '75%', sm: '56.25%', md: '50%' }, // Responsive aspect ratio
                backgroundColor: '#000',
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
                    transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: 'opacity',
                    pointerEvents: index === activeIndex ? 'auto' : 'none',
                  }}
                >
                  {/* Background Image */}
                  <Box
                    component="img"
                    src={slide.image}
                    alt={slide.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.7)',
                    }}
                  />

                  {/* Content Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
                    }}
                  >
                    <Box
                      sx={{
                        textAlign: 'center',
                        px: 3,
                        maxWidth: '800px',
                      }}
                    >
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                          fontWeight: 700,
                          color: 'white',
                          mb: 2,
                          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}
                      >
                        {slide.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                          color: 'rgba(255,255,255,0.95)',
                          mb: 4,
                          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        {slide.subtitle}
                      </Typography>
                      {slide.cta && (
                        <Button
                          component={Link}
                          to={slide.cta.link}
                          variant="contained"
                          size="large"
                          endIcon={<ArrowForward />}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            color: 'primary.main',
                            borderRadius: 3,
                            textTransform: 'none',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                              backgroundColor: 'white',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
                            },
                          }}
                        >
                          {slide.cta.text}
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
              <>
                <IconButton
                  onClick={goToPrevious}
                  data-testid="carousel-prev"
                  sx={{
                    position: 'absolute',
                    left: { xs: 8, md: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'primary.main',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'white',
                      transform: 'translateY(-50%) scale(1.1)',
                    },
                  }}
                >
                  <ChevronLeft fontSize="large" />
                </IconButton>

                <IconButton
                  onClick={goToNext}
                  data-testid="carousel-next"
                  sx={{
                    position: 'absolute',
                    right: { xs: 8, md: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'primary.main',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'white',
                      transform: 'translateY(-50%) scale(1.1)',
                    },
                  }}
                >
                  <ChevronRight fontSize="large" />
                </IconButton>
              </>
            )}

            {/* Indicator Dots */}
            {slides.length > 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1.5,
                }}
              >
                {slides.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => goToSlide(index)}
                    data-testid={`carousel-dot-${index}`}
                    sx={{
                      width: index === activeIndex ? 32 : 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor:
                        index === activeIndex
                          ? 'rgba(255, 255, 255, 0.95)'
                          : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      willChange: 'width, background-color',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    );
  }
);

CarouselSection.displayName = 'CarouselSection';
