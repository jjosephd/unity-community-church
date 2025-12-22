import { Box, Container, Typography } from '@mui/material';
import { memo } from 'react';

interface VideoSectionProps {
  youtubeId?: string;
  title?: string;
  description?: string;
}

/**
 * Video Section Component
 * Features:
 * - Responsive YouTube embed
 * - 16:9 aspect ratio maintained
 * - Smooth loading with glassmorphism container
 */
export const VideoSection = memo(
  ({
    youtubeId = '5_iob6lOUOI', // Default video ID
    title = 'Watch Our Latest Message',
    description = 'Experience powerful worship and life-changing messages from our recent services.',
  }: VideoSectionProps) => {
    return (
      <Box
        component="section"
        data-testid="video-section"
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
              data-testid="video-title"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
                letterSpacing: '-0.01em',
              }}
            >
              {title}
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
              {description}
            </Typography>
          </Box>

          {/* Video Container */}
          <Box
            sx={{
              maxWidth: '900px',
              mx: 'auto',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(90, 12, 119, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              p: { xs: 1, sm: 2 },
              transition:
                'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              contain: 'layout style paint',
              '&:hover': {
                transform: 'translate3d(0, -4px, 0)',
                boxShadow: '0 24px 70px rgba(90, 12, 119, 0.2)',
                willChange: 'transform, box-shadow',
              },
            }}
          >
            {/* Responsive iframe wrapper - maintains 16:9 aspect ratio */}
            <Box
              sx={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
                borderRadius: 3,
                backgroundColor: '#000',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
);

VideoSection.displayName = 'VideoSection';
