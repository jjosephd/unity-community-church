import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
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
 * Features:
 * - 4-column responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
 * - Image cards with icons
 * - Smooth hover animations
 * - Glassmorphism effects
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
                <Card
                  data-testid={`about-card-${index}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 12, 119, 0.08)',
                    boxShadow: '0 4px 20px rgba(90, 12, 119, 0.08)',
                    transition:
                      'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: 'transform, box-shadow',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(90, 12, 119, 0.15)',
                      '& .card-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  {/* Card Image */}
                  <Box
                    sx={{
                      position: 'relative',
                      paddingTop: '60%',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(90, 12, 119, 0.05)',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={card.image}
                      alt={card.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition:
                          'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                    {/* Icon Overlay */}
                    <Box
                      className="card-icon"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition:
                          'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 28,
                          color: 'text.secondary',
                          transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Card Content */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: 3,
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
                        mb: 1.5,
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
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
});

AboutSection.displayName = 'AboutSection';
