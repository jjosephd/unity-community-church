import {
  Box,
  Container,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState, useEffect } from 'react';
import { LocationFooter } from '../components/connect/LocationFooter';
import { useSanityData } from '../hooks/useSanityData';
import { ABOUT_PAGE_QUERY } from '../lib/sanityQueries';

const StatementOfBeliefs = () => {
  const beliefs = [
    {
      title: 'The Bible',
      content:
        'We believe the Bible to be the inspired, the only infallible, authoritative Word of God.',
    },
    {
      title: 'The Godhead',
      content:
        'We believe that there is one God, eternally existent in three persons: Father, Son, and Holy Spirit.',
    },
    {
      title: 'Salvation',
      content:
        'We believe that for the salvation of lost and sinful man, regeneration by the Holy Spirit is absolutely essential.',
    },
    {
      title: 'The Church',
      content:
        'We believe in the spiritual unity of believers in our Lord Jesus Christ.',
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      {beliefs.map((belief, index) => (
        <Accordion
          key={index}
          elevation={0}
          disableGutters
          sx={{
            '&:before': { display: 'none' },
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            bgcolor: 'transparent',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
            sx={{ px: 0, py: 1 }}
          >
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              {belief.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 3 }}>
            <Typography variant="body1" color="text.secondary">
              {belief.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

interface AboutPageData {
  slideshowImages?: string[];
}

export const AboutStoryPage = () => {
  const { data: aboutData } = useSanityData<AboutPageData>(
    'aboutPage',
    ABOUT_PAGE_QUERY,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const images = aboutData?.slideshowImages;
    if (!isPlaying || !images?.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, aboutData?.slideshowImages]);

  const currentImage =
    aboutData?.slideshowImages && aboutData.slideshowImages.length > 0
      ? aboutData.slideshowImages[currentImageIndex]
      : '/images/connect.jpg';

  const churchInfo = {
    address: '3660 Old Buckingham Rd, Powhatan, VA 23139',
    phone: '(804) 256-4411',
    email: 'info@unitypow.org',
    mapUrl:
      'https://maps.google.com/?q=3660+Old+Buckingham+Rd+Powhatan+VA+23139',
  };

  return (
    <Box>
      {/* 1. Hero Section (Left-Aligned, Impact Block) */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: '800px',
              textAlign: 'left',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: { xs: '3rem', md: '4rem' },
                lineHeight: 1.1,
                mb: 3,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Living By Faith
              <br />
              <Box component="span" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Walking In Love
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: '800px',
                opacity: 0.9,
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Where there's Unity, there's always Victory! <br /> Join us as we
              grow together in Christ.
            </Typography>
          </Box>
        </Container>

        {/* Abstract Background Element */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />
      </Box>

      {/* 2. Welcome & Media Block (Asymmetrical Two-Column Split) */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={8} alignItems="center">
          {/* Left Column: Text */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                pl: 3,
                mb: 4,
              }}
            >
              <Typography
                variant="overline"
                fontWeight="bold"
                color="text.secondary"
                sx={{ letterSpacing: '0.2em' }}
              >
                Welcome Home
              </Typography>
              <Typography
                variant="h4"
                component="h3"
                fontWeight=""
                sx={{
                  mt: 1,
                  fontFamily: '"Montserrat", sans-serif',
                  textTransform: 'uppercase',
                  color: 'primary.main',
                }}
              >
                A Place for Everyone
              </Typography>
            </Box>

            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}
            >
              Welcome to Unity Community Church! We are a vibrant community of
              believers dedicated to sharing the love of Christ and empowering
              people to live victorious lives. Whether you're joining us for the
              first time or looking for a church home, you are welcome here.
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              Our mission is simple: to lead people to Jesus through the Word
              and application. We believe that true change happens when we apply
              God's truth to our everyday lives, transforming our community one
              heart at a time.
            </Typography>
          </Grid>

          {/* Right Column: Media */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 Aspect Ratio
                bgcolor: 'black',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              }}
            >
              {/* Placeholder for Video */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${currentImage})`, // Use existing image as placeholder bg
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-image 0.5s ease-in-out',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: isPlaying ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.4)',
                    transition: 'background-color 0.5s ease-in-out',
                  },
                }}
              >
                {!isPlaying && (
                  <IconButton
                    size="large"
                    onClick={() => setIsPlaying(true)}
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'white',
                      color: 'primary.main',
                      zIndex: 2,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    <PlayArrowIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 3. Lead Pastor Bio Section (Two-Column Flow) */}
      <Box sx={{ bgcolor: 'rgba(90, 12, 119, 0.03)', py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            {/* Image Column */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                component="img"
                src="/images/pastor01.jpg"
                alt="Dr. Cavell W. Phillips"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(90, 12, 119, 0.15)',
                  transform: { md: 'rotate(-2deg)' },
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'rotate(0deg)',
                  },
                }}
              />
            </Grid>

            {/* Text Column */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="h2"
                align="left"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  color: 'primary.main',
                  mb: 4,
                }}
              >
                Pastor Cavell
              </Typography>

              <Box
                sx={{
                  typography: 'body1',
                  fontSize: '1.2rem',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                <Typography paragraph>
                  I founded Unity Community Church in January 2018 with a
                  burning desire to see lives transformed by the power of Jesus
                  Christ. My journey hasn't always been a straight line, but it
                  has always pointed toward this moment—leading a community of
                  believers who are hungry for more than just religion.
                </Typography>

                <Typography paragraph>
                  I believe that salvation isn't just a destination; it's a
                  daily walk. My mission is to preach the Word with simplicity
                  and power, focusing on practical application that changes how
                  we live, how we love, and how we serve.
                </Typography>

                <Typography paragraph>
                  We are preparing people not just for life here on earth, but
                  for eternal life. It is my honor to serve this community and
                  to walk alongside you as we pursue God's purpose together.
                </Typography>

                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      color: 'primary.main',
                      fontWeight: 'bold',
                    }}
                  >
                    - Dr Cavell W Phillips
                  </Typography>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    display="block"
                  >
                    Senior Pastor & Founder
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 4. "What We Believe" (Theological Grid / Accordion) */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight="bold"
            letterSpacing="0.2em"
          >
            Our Foundation
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              mt: 1,
              textTransform: 'uppercase',
              fontFamily: '"Montserrat", sans-serif',
              color: 'primary.main',
              letterSpacing: '0.025em',
            }}
          >
            What We Believe
          </Typography>
          <Divider
            sx={{
              width: 60,
              height: 4,
              bgcolor: 'primary.main',
              mx: 'auto',
              mt: 3,
              borderRadius: 2,
            }}
          />
        </Box>

        <StatementOfBeliefs />
      </Container>

      {/* 5. Global Footer */}
      <LocationFooter
        address={churchInfo.address}
        phone={churchInfo.phone}
        email={churchInfo.email}
        mapUrl={churchInfo.mapUrl}
      />
    </Box>
  );
};
