/**
 * GivingHero Component
 * Hero section for the giving page with welcoming message
 */

import { Box, Container, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { memo } from 'react';
import { givingPageContent } from '../../data/givingData';

export const GivingHero = memo(() => {
  return (
    <Box
      component="section"
      data-testid="giving-hero"
      sx={{
        pt: { xs: 12, md: 16 },
        pb: { xs: 6, md: 8 },
        background:
          'linear-gradient(135deg, rgba(90, 12, 119, 0.03) 0%, rgba(90, 12, 119, 0.08) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '60%',
          height: '200%',
          background:
            'radial-gradient(circle, rgba(90, 12, 119, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Heart Icon */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background:
                'linear-gradient(135deg, rgba(90, 12, 119, 0.15) 0%, rgba(90, 12, 119, 0.25) 100%)',
              mb: 3,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(90, 12, 119, 0.2)',
                },
                '50%': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 0 15px rgba(90, 12, 119, 0)',
                },
              },
            }}
          >
            <Favorite
              sx={{
                fontSize: 40,
                color: 'primary.main',
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 800,
              color: 'primary.main',
              mb: 2,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {givingPageContent.hero.title}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
              fontWeight: 500,
              color: 'text.secondary',
              mb: 3,
            }}
          >
            {givingPageContent.hero.subtitle}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            {givingPageContent.hero.description}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
});

GivingHero.displayName = 'GivingHero';
