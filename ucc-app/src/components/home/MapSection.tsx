import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { Directions } from '@mui/icons-material';
import { memo } from 'react';

interface MapSectionProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

/**
 * Map Section Component
 * Features:
 * - Google Maps embed (placeholder for now)
 * - Responsive iframe
 * - Directions button
 * - Clean, modern styling
 *
 * Note: In production, integrate with Google Maps API
 * using @react-google-maps/api or similar library
 */
export const MapSection = memo(
  ({
    center = { lat: 37.5407, lng: -77.9189 }, // Powhatan, VA
    zoom = 14,
  }: MapSectionProps) => {
    // Google Maps embed URL
    const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM${center.lat}!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus&z=${zoom}`;

    const handleGetDirections = () => {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`,
        '_blank'
      );
    };

    return (
      <Box
        component="section"
        data-testid="map-section"
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'rgba(253, 248, 243, 1)',
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
              Visit Us
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              We're located in the heart of Powhatan. Join us for worship this
              Sunday!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Directions />}
              onClick={handleGetDirections}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.05rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Get Directions
            </Button>
          </Box>

          {/* Map Container */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(90, 12, 119, 0.15)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
                backgroundColor: 'rgba(90, 12, 119, 0.05)',
              }}
            >
              {/* Google Maps Embed */}
              <iframe
                src={mapEmbedUrl}
                title="Unity Community Church Location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
          </Paper>

          {/* Additional Info */}
          <Box
            sx={{
              mt: 4,
              textAlign: 'center',
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Parking:</strong> Free parking available in our lot and on
              surrounding streets
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Accessibility:</strong> Wheelchair accessible entrance and
              facilities
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }
);

MapSection.displayName = 'MapSection';
