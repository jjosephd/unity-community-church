import { Box, Container, Typography, Grid } from '@mui/material';
import {
  Church as ChurchIcon,
  MenuBook as BookIcon,
  VolunteerActivism as HandsIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { memo } from 'react';
import type { AboutCard } from '../../types/home';

interface AboutSectionProps {
  cards: AboutCard[];
}

const iconMap = {
  church: ChurchIcon,
  book: BookIcon,
  hands: HandsIcon,
  people: PeopleIcon,
};

/**
 * About Us Section Component
 * Edge-to-edge / bleed layout:
 * - Full-bleed imagery with no rounded corners
 * - Typographic hierarchy and whitespace define boundaries
 * - Icon overlays on images
 */
export const AboutSection = memo(({ cards }: AboutSectionProps) => {
  return (
    <Box
      component="section"
      data-testid="about-section"
      sx={{
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
            Welcome to Our Church Family
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
            Discover what makes Unity Community Church a place where faith
            grows, lives are transformed, and community thrives.
          </Typography>
        </Box>

        {/* Cards Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {cards.map((card, index) => {
            const IconComponent =
              iconMap[card.icon as keyof typeof iconMap] || ChurchIcon;

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.id}>
                <Box
                  data-testid={`about-card-${index}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {/* Full-bleed Image */}
                  <Box
                    sx={{
                      position: 'relative',
                      paddingTop: '65%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={card.image}
                      alt={card.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition:
                          'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        },
                      }}
                    />
                    {/* Icon Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24 }} />
                    </Box>
                  </Box>

                  {/* Content — whitespace replaces card padding */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      pt: 2.5,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 1,
                        fontSize: '1.25rem',
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        fontSize: '0.95rem',
                      }}
                    >
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
});

AboutSection.displayName = 'AboutSection';
