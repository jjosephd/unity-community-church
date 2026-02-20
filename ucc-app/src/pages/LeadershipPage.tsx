import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';

import { useSanityData } from '../hooks/useSanityData';
import { LEADERSHIP_GROUPS_QUERY } from '../lib/sanityQueries';
import { ContentFallbackBanner } from '../components/common/ContentFallbackBanner';

// --- Types & Interfaces ---

interface Leader {
  name: string;
  role: string;
  image?: string; // Optional for now, will use placeholder if missing
  bio?: string;
}

interface LeadershipGroup {
  id: string;
  title: string;
  description: string; // The role description provided in the requirements
  members: Leader[];
}

// --- Components ---

const LeadershipSection = ({ group }: { group: LeadershipGroup }) => {
  return (
    <Box sx={{ mb: 8 }}>
      <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            color: 'primary.main',
            mb: 1,
            textTransform: 'uppercase',
          }}
        >
          {group.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: '800px',
            mx: { xs: 'auto', md: 0 },
            fontStyle: 'italic',
          }}
        >
          {group.description}
        </Typography>
        <Divider
          sx={{
            mt: 2,
            mb: 4,
            maxWidth: 100,
            mx: { xs: 'auto', md: 0 },
            bgcolor: 'secondary.main',
            height: 4,
            borderRadius: 2,
          }}
        />
      </Box>

      {(group.members || []).length > 0 ? (
        <Grid container spacing={4}>
          {(group.members || []).map((member, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  bgcolor: 'transparent',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 4,
                  p: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.main',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  },
                }}
              >
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'background.paper',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="primary.main"
                    sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 1 }}
                  >
                    {member.role}
                  </Typography>
                  {member.bio && (
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            p: 4,
            bgcolor: 'grey.50',
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'grey.300',
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Details coming soon for {group.title}.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export const LeadershipPage = () => {
  const {
    data: leadershipGroups,
    isLoading,
    error,
  } = useSanityData<LeadershipGroup[]>(
    'leadershipGroups',
    LEADERSHIP_GROUPS_QUERY,
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: '0.2em',
                fontWeight: 'bold',
                opacity: 0.8,
                display: 'block',
                mb: 1,
              }}
            >
              Our Team
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                textTransform: 'uppercase',
              }}
            >
              Leadership
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                fontWeight: 300,
                opacity: 0.9,
                lineHeight: 1.6,
              }}
            >
              Dedicated servants committed to guiding our church family and
              serving our community.
            </Typography>
          </Box>
        </Container>

        {/* Background elements similar to AboutStoryPage */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.0))',
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background:
              'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.0))',
            filter: 'blur(40px)',
          }}
        />
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress aria-label="Loading leadership data" />
          </Box>
        )}

        {error && <ContentFallbackBanner />}

        {!isLoading &&
          !error &&
          (!leadershipGroups || leadershipGroups.length === 0) && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="body1" color="text.secondary">
                Check back soon for leadership updates.
              </Typography>
            </Box>
          )}

        {!isLoading &&
          !error &&
          leadershipGroups &&
          leadershipGroups.map((group) => (
            <LeadershipSection key={group.id} group={group} />
          ))}
      </Container>
    </Box>
  );
};
