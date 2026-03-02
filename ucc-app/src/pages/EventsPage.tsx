import { Box, Container, Typography } from '@mui/material';
import { memo } from 'react';
import { CalendarView } from '../components/events/CalendarView';

const PAGE_BG = 'rgb(253, 248, 243)';

export const EventsPage = memo(() => {
  return (
    <Box
      component="main"
      data-testid="events-page"
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        backgroundColor: PAGE_BG,
      }}
    >
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: 'primary.main',
              mb: 2,
            }}
          >
            Community Calendar
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              color: 'text.secondary',
              fontSize: '1.1rem',
              fontWeight: 500,
            }}
          >
            the heartbeat of Unity Community Church. Upcoming events, recurring
            workshops, and special moments. Stay connected!
          </Typography>
        </Box>

        {/* Google Calendar View */}
        <CalendarView />
      </Container>
    </Box>
  );
});

EventsPage.displayName = 'EventsPage';
