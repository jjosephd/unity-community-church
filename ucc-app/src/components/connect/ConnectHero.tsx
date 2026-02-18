import { Box, Container, Typography } from '@mui/material';
import { memo } from 'react';

/**
 * Connect Hero Section
 * Simple hero with "Let's Connect" heading
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
          className="font-alfa uppercase"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '0.05em',
            mb: 3,
            color: 'primary.main',
          }}
        >
          Let's Connect
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
