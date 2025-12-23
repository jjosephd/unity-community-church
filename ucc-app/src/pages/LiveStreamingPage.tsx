import { Box, Container, Typography, Paper } from '@mui/material';
import { memo } from 'react';

/**
 * Live Streaming Page
 * Displays embedded Facebook live/recorded videos
 */
export const LiveStreamingPage = memo(() => {
  return (
    <Box
      component="main"
      data-testid="live-streaming-page"
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
            Live Streaming
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
            Watch our latest Sunday service recordings and live streams from
            Unity Community Church.
          </Typography>
        </Box>

        {/* Video Container */}
        <Paper
          elevation={0}
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            contain: 'layout style paint',
          }}
        >
          {/* Facebook Video Embed */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              minHeight: { xs: 400, sm: 500, md: 600 },
            }}
          >
            <iframe
              src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0yh2AT2fMw6kzovEB7FKNiqxVQwb6HgqG55CxaXYAJZAtJowZZcKyaHQZpwxXy87vl%26id%3D100064909292003&show_text=true&width=500"
              width="100%"
              height="100%"
              style={{
                border: 'none',
                overflow: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="UCC Sunday Service - Live Stream"
            />
          </Box>
        </Paper>

        {/* Additional Info */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Can't make it in person? Join us every Sunday at 10:30 AM for our
            live broadcast on Facebook.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
});

LiveStreamingPage.displayName = 'LiveStreamingPage';
