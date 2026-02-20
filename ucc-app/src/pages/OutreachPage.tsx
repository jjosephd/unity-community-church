import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

// --- Types & Interfaces ---

interface MinistryTeam {
  id: string;
  name: string;
  description: string;
  leader?: string;
  ctaLink: string;
}

// --- Mock Data ---

const ministryTeams: MinistryTeam[] = [
  {
    id: 'kids',
    name: 'Youth',
    description:
      'We create a fun, safe, and engaging environment where children can learn about Jesus and build a foundation of faith that lasts a lifetime.',
    leader: 'Youth Leader',
    ctaLink: '#join-kids',
  },
  {
    id: 'ushers',
    name: 'Ushers',
    description:
      'We serve by maintaining order, helping guests find seats, and facilitating the offering, ensuring a smooth and reverent worship experience.',
    ctaLink: '#join-ushers',
  },
  {
    id: 'media',
    name: 'Media Team',
    description:
      'We enhance the worship experience through sound, video, lighting, and livestreaming, bringing the message to those in the room and online.',
    ctaLink: '#join-media',
  },
  {
    id: 'parking',
    name: 'Parking Ministry',
    description:
      'We are the first faces you see! We ensure a welcoming and safe arrival for every guest, rain or shine.',
    ctaLink: '#join-parking',
  },
  {
    id: 'greeters',
    name: 'Greeters',
    description:
      'We welcome every person with a smile and a warm hello, helping them feel at home from the moment they walk through our doors.',
    ctaLink: '#join-greeters',
  },
  {
    id: 'marriage',
    name: 'Marriage Ministry',
    description:
      'We support couples in building strong, God-centered marriages through mentorship, events, and biblical teaching.',
    leader: 'Cavell & Vanessa Phillips',
    ctaLink: '#join-marriage',
  },
];

// --- Components ---

const TeamSection = ({
  team,
  index,
}: {
  team: MinistryTeam;
  index: number;
}) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            color: 'primary.main',
            mb: 1,
            textTransform: 'uppercase',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          {team.name}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            mb: 2,
            color: 'text.secondary',
            maxWidth: '800px',
            fontSize: '1.1rem',
          }}
        >
          {team.description}
        </Typography>

        {team.leader && (
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: '0.85rem',
            }}
          >
            Led by:{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              {team.leader}
            </Box>
          </Typography>
        )}

        <Button
          variant="text"
          color="primary"
          endIcon={<ArrowForward />}
          href={team.ctaLink}
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            px: 0,
            '&:hover': {
              bgcolor: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          Join the {team.name}
        </Button>
      </Box>

      {/* Divider between items, but not after the last one */}
      {index < ministryTeams.length - 1 && (
        <Divider sx={{ mt: 4, borderColor: 'rgba(0,0,0,0.08)' }} />
      )}
    </Box>
  );
};

export const OutreachPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '50vh', md: '60vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/worship.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)', // Darken for readability
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: { xs: '2.5rem', md: '4.5rem' },
              mb: 2,
              textTransform: 'uppercase',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            Get Involved
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              px: 2,
            }}
          >
            Join one of our Impact Teams and make a difference. We believe that
            serving others is the heart of our mission and the best way to
            connect with our community.
          </Typography>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Grid container spacing={6}>
          {/* Left Column: Intro/Mission */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: '0.2em',
                  color: 'primary.main',
                  fontWeight: 'bold',
                  mb: 2,
                  display: 'block',
                }}
              >
                Our Ministries
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 3,
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                }}
              >
                Find Your Place
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Whether you have a heart for kids, a talent for technology, or
                simply a warm smile, there is a place for you to serve. Explore
                our teams and find where you belong.
              </Typography>
              <Box
                component="img"
                src="/images/outreach.png"
                alt="Community Outreach"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  transform: 'rotate(-2deg)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  display: { xs: 'none', md: 'block' },
                }}
              />
            </Box>
          </Grid>

          {/* Right Column: Team List */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 4,
                p: { xs: 3, md: 6 },
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {ministryTeams.map((team, index) => (
                <TeamSection key={team.id} team={team} index={index} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
