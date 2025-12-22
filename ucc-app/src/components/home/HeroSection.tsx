import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { memo } from 'react';

/**
 * Hero Section Component
 * Features:
 * - Full viewport height
 * - Gradient background with glassmorphism
 * - Responsive typography
 * - CTA buttons with smooth hover effects
 */
export const HeroSection = memo(() => {
  return (
    <Box
      component="section"
      data-testid="hero-section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, rgba(90, 12, 119, 0.95) 0%, rgba(90, 12, 119, 0.85) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          py: { xs: 8, md: 12 },
        }}
      >
        {/* Main Heading */}
        <Typography
          variant="h1"
          component="h1"
          data-testid="hero-title"
          sx={{
            fontSize: {
              xs: '2.5rem',
              sm: '3.5rem',
              md: '4.5rem',
              lg: '5.5rem',
            },
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.98)',
            mb: 3,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInUp 0.8s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          Where there is unity,
          <br />
          there's always{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
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
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
            animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
          }}
        >
          Unity Community Church - Powhatan
        </Typography>

        {/* CTA Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{
            animation: 'fadeInUp 0.8s ease-out 0.4s backwards',
          }}
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
              fontSize: '1.1rem',
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: 'primary.main',
              borderRadius: 3,
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition:
                'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
              },
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
              fontSize: '1.1rem',
              fontWeight: 600,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 3,
              borderWidth: 2,
              textTransform: 'none',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition:
                'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 2,
                transform: 'translateY(-2px)',
              },
            }}
          >
            Upcoming Events
          </Button>
        </Stack>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateX(-50%) translateY(0)',
              },
              '40%': {
                transform: 'translateX(-50%) translateY(-10px)',
              },
              '60%': {
                transform: 'translateX(-50%) translateY(-5px)',
              },
            },
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 50,
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: 20,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                animation: 'scroll 2s infinite',
                '@keyframes scroll': {
                  '0%': {
                    opacity: 1,
                    transform: 'translateX(-50%) translateY(0)',
                  },
                  '100%': {
                    opacity: 0,
                    transform: 'translateX(-50%) translateY(20px)',
                  },
                },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
});

HeroSection.displayName = 'HeroSection';
