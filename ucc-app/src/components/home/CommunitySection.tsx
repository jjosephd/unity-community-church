import {
  Box,
  Container,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import { memo } from 'react';
import type { CommunityItem } from '../../types/home';

interface CommunitySectionProps {
  items: CommunityItem[];
}

/**
 * Community Section Component
 * Edge-to-edge / bleed layout:
 * - Full-bleed imagery
 * - Stats overlay on images
 * - Whitespace-defined content boundaries
 */
export const CommunitySection = memo(({ items }: CommunitySectionProps) => {
  return (
    <Box
      component="section"
      data-testid="community-section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        backgroundColor: 'rgba(253, 248, 243, 1)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            Our Community Impact
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
            Together, we're making a lasting difference in lives and building a
            stronger community
          </Typography>
        </Box>

        {/* Community Items Grid */}
        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.id}>
              <Box
                data-testid={`community-item-${index}`}
                sx={{
                  height: '100%',
                  minHeight: { xs: 'auto', md: '500px' },
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Full-bleed Image */}
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%', // 16:9 aspect ratio
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition:
                        'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      },
                    }}
                  />

                  {/* Stats Overlay */}
                  {item.stats && (
                    <Chip
                      icon={<TrendingUp />}
                      label={
                        <Box component="span">
                          <Box
                            component="span"
                            sx={{ fontWeight: 700, fontSize: '1.1rem' }}
                          >
                            {item.stats.value}
                          </Box>
                          <Box
                            component="span"
                            sx={{ ml: 0.5, fontSize: '0.9rem' }}
                          >
                            {item.stats.label}
                          </Box>
                        </Box>
                      }
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        color: 'primary.main',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        px: 2,
                        py: 2.5,
                        height: 'auto',
                        '& .MuiChip-icon': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  )}
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    flexGrow: 1,
                    pt: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 2,
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      fontSize: '1.05rem',
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

CommunitySection.displayName = 'CommunitySection';
