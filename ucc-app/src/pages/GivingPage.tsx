/**
 * GivingPage Component
 * Main giving page that composes all giving components
 */

import { Box } from '@mui/material';
import { memo, useCallback } from 'react';
import { GivingHero, GivingFormCard } from '../components/giving';
import type { GivingFormData } from '../types/giving';

/**
 * Giving Page
 *
 * Sections:
 * 1. Hero - Welcoming message with animated icon
 * 2. Form Card - Multi-step giving form with summary
 *
 * Security:
 * - No payment URLs or API endpoints stored client-side
 * - Form submission will redirect via secure backend endpoint
 */
export const GivingPage = memo(() => {
  const handleSubmit = useCallback((data: GivingFormData) => {
    // This will be replaced with a secure backend call
    // that handles the payment provider redirect
    console.log('Giving form submitted:', data);
    // TODO: Call Django backend endpoint that securely redirects to Givelify/CashApp
  }, []);

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

      {/* Giving Form */}
      <GivingFormCard onSubmit={handleSubmit} />
    </Box>
  );
});

GivingPage.displayName = 'GivingPage';
