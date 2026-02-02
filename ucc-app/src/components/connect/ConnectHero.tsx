import { Box, Container, Typography } from '@mui/material';
import { memo } from 'react';

/**
 * Connect Hero Section
 * Simple hero with "Let's Connect" gradient heading
 */
export const ConnectHero = memo(() => {
  return (
    <Box
      component="section"
      data-testid="connect-hero"
      sx={{
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component="h1"
          data-testid="connect-hero-title"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            mb: 3,
          }}
        >
          Let's{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(90deg, #5A0C77 0%, #8B2FC9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Connect
          </Box>
        </Typography>
        <Typography
          variant="h5"
          component="p"
          data-testid="connect-hero-subtitle"
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          We'd love to hear from you. Reach out, visit us, or learn more about
          how you can become part of our community.
        </Typography>
      </Container>
    </Box>
  );
});

ConnectHero.displayName = 'ConnectHero';
