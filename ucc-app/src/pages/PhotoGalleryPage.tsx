import { Box, Container, Typography, Paper } from '@mui/material';
import { PhotoLibrary } from '@mui/icons-material';
import { memo } from 'react';

/**
 * Photo Gallery Page (Placeholder)
 * Will be enhanced with actual gallery functionality in future
 */
export const PhotoGalleryPage = memo(() => {
  return (
    <Box
      component="main"
      data-testid="photo-gallery-page"
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              letterSpacing: '-0.01em',
            }}
          >
            Photo Gallery
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Browse photos from our church events, services, and community
            activities.
          </Typography>
        </Box>

        {/* Coming Soon Placeholder */}
        <Paper
          elevation={0}
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <PhotoLibrary
            sx={{
              fontSize: 80,
              color: 'primary.light',
              mb: 3,
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
          >
            Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We're working on bringing you a beautiful gallery of photos from our
            church community. Check back soon!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
});

PhotoGalleryPage.displayName = 'PhotoGalleryPage';
