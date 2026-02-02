import { Box, Container, Typography, Button } from '@mui/material';
import { Construction, HomeRounded } from '@mui/icons-material';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface UnderConstructionProps {
  /** Page title to display */
  pageTitle?: string;
  /** Custom message to show */
  message?: string;
  /** Whether to show the "Go Home" button */
  showHomeButton?: boolean;
}

/**
 * Under Construction Component
 * Reusable placeholder for pages that are still being built
 */
export const UnderConstruction = memo(
  ({
    pageTitle = 'Coming Soon',
    message = "We're working hard to bring you something amazing. Check back soon!",
    showHomeButton = true,
  }: UnderConstructionProps) => {
    const navigate = useNavigate();

    return (
      <Box
        component="main"
        data-testid="under-construction"
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, rgba(139, 47, 201, 0.03) 0%, rgba(139, 47, 201, 0.08) 100%)',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(139, 47, 201, 0.12)',
              border: '1px solid rgba(139, 47, 201, 0.1)',
            }}
          >
            {/* Animated Icon */}
            <Box
              sx={{
                display: 'inline-flex',
                p: 3,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8B2FC9 0%, #A855F7 100%)',
                mb: 4,
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 0 rgba(139, 47, 201, 0.4)',
                  },
                  '50%': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 0 20px rgba(139, 47, 201, 0)',
                  },
                },
              }}
            >
              <Construction
                sx={{
                  fontSize: 48,
                  color: 'white',
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontFamily: '"Ultra", serif',
                fontSize: { xs: '2rem', md: '2.75rem' },
                fontWeight: 400,
                color: 'text.primary',
                mb: 2,
              }}
            >
              {pageTitle}
            </Typography>

            {/* Message */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: 'text.secondary',
                lineHeight: 1.7,
                mb: showHomeButton ? 4 : 0,
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              {message}
            </Typography>

            {/* Home Button */}
            {showHomeButton && (
              <Button
                variant="contained"
                size="large"
                startIcon={<HomeRounded />}
                onClick={() => navigate('/')}
                sx={{
                  background:
                    'linear-gradient(135deg, #8B2FC9 0%, #A855F7 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 14px rgba(139, 47, 201, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #7B27B5 0%, #9333EA 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(139, 47, 201, 0.4)',
                  },
                }}
              >
                Back to Home
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    );
  },
);

UnderConstruction.displayName = 'UnderConstruction';
