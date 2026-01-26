/**
 * GivingPage Component
 * Main giving page with platform selector
 */

import { Box } from '@mui/material';
import { memo } from 'react';
import { GivingHero } from '../components/giving/GivingHero';
import { GivingPlatformSelector } from '../components/giving/GivingPlatformSelector';

/**
 * Giving Page
 *
 * Sections:
 * 1. Hero - Welcoming message with animated icon
 * 2. Platform Selector - Choose Givelify or Cash App
 *
 * Security:
 * - No payment URLs stored client-side (configured in givingData.ts for now)
 * - In production, URLs should be served from backend
 */
export const GivingPage = memo(() => {
  return (
    <Box
      component="main"
      data-testid="giving-page"
      sx={{
        width: '100%',
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, rgba(253, 248, 243, 1) 0%, rgba(253, 248, 243, 0.95) 100%)',
      }}
    >
      {/* Hero Section */}
      <GivingHero />

      {/* Platform Selector */}
      <GivingPlatformSelector />
    </Box>
  );
});

GivingPage.displayName = 'GivingPage';
