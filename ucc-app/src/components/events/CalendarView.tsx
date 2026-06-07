import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Drawer,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Close as CloseIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  parseISO,
} from 'date-fns';
import { useState, useMemo } from 'react';
import { useSanityData } from '../../hooks/useSanityData';
import { ALL_EVENTS_QUERY } from '../../lib/sanityQueries';
import type { Event as SanityEvent } from '../../types/sanity';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // Fetch all events from Sanity
  const { data: allEvents = [] } = useSanityData<SanityEvent[]>(
    'allEvents',
    ALL_EVENTS_QUERY,
  );

  // Filter events for the current month view
  const events = useMemo(() => {
    return allEvents.filter((event) => {
      const eventDate = parseISO(event.date);
      // We check if the event falls within the visible calendar grid,
      // which might include days from the previous/next month.
      const calendarStart = startOfWeek(monthStart);
      const calendarEnd = endOfWeek(monthEnd);
      return eventDate >= calendarStart && eventDate <= calendarEnd;
    });
  }, [allEvents, monthStart, monthEnd]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Generate the days for the calendar grid
  const days = useMemo(() => {
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [monthStart, monthEnd]);

  // Map events to days
  const eventsByDay = useMemo(() => {
    const map = new Map<string, SanityEvent[]>();
    events.forEach((event) => {
      if (event.date) {
        // Assume event.date is YYYY-MM-DD
        const dateKey = event.date.split('T')[0];
        const existing = map.get(dateKey) || [];
        existing.push(event);
        map.set(dateKey, existing);
      }
    });
    return map;
  }, [events]);

  const handleEventClick = (event: SanityEvent) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Calendar Grid */}
      <Box sx={{ width: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: 'primary.main', fontWeight: 700 }}
            >
              {format(currentDate, 'MMMM yyyy')}
            </Typography>
            <Box>
              <IconButton
                onClick={handlePrevMonth}
                sx={{ color: 'primary.main' }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={handleNextMonth}
                sx={{ color: 'primary.main' }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Days of Week Header */}
          <Grid container spacing={1} columns={7} sx={{ mb: 1 }}>
            {DAYS_OF_WEEK.map((day) => (
              <Grid size={{ xs: 1 }} key={day} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Calendar Cells */}
          <Grid container spacing={1} columns={7}>
            {days.map((day) => {
              const dayStr = format(day, 'yyyy-MM-dd');
              const dayEvents = eventsByDay.get(dayStr) || [];
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isTodayDate = isToday(day);

              return (
                <Grid size={{ xs: 1 }} key={dayStr}>
                  <Box
                    sx={{
                      minHeight: { xs: 80, sm: 100 },
                      p: 1,
                      bgcolor: isTodayDate
                        ? 'rgba(90, 12, 119, 0.04)'
                        : 'transparent',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: isTodayDate
                        ? 'primary.main'
                        : 'rgba(0,0,0,0.05)',
                      opacity: isCurrentMonth ? 1 : 0.4,
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isTodayDate ? 700 : 500,
                        color: isTodayDate ? 'primary.main' : 'text.primary',
                        mb: 0.5,
                      }}
                    >
                      {format(day, 'd')}
                    </Typography>

                    {/* Events for this day */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                        flex: 1,
                        overflow: 'hidden',
                      }}
                    >
                      {dayEvents.slice(0, 3).map((evt) => (
                        <Box
                          key={evt._id}
                          onClick={() => handleEventClick(evt)}
                          sx={{
                            bgcolor:
                              selectedEvent?._id === evt._id
                                ? 'primary.dark'
                                : 'primary.main',
                            color: 'white',
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            '&:hover': {
                              bgcolor: 'primary.dark',
                            },
                          }}
                        >
                          {evt.title}
                        </Box>
                      ))}
                      {dayEvents.length > 3 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: '0.65rem', pl: 0.5 }}
                        >
                          +{dayEvents.length - 3} more
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Box>

      {/* Event Details Drawer */}
      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 400,
            maxWidth: '100%',
            height: isMobile ? '80vh' : '100%',
            borderTopLeftRadius: isMobile ? 24 : 0,
            borderTopRightRadius: isMobile ? 24 : 0,
            p: { xs: 2, sm: 4 },
            bgcolor: 'background.paper',
            backgroundImage: 'linear-gradient(to bottom, #ffffff, #fafafa)',
          },
        }}
      >
        {selectedEvent && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  pr: 2,
                  fontFamily: '"Outfit", "Inter", sans-serif',
                }}
              >
                {selectedEvent.title}
              </Typography>
              <IconButton
                onClick={handleCloseDrawer}
                sx={{
                  bgcolor: 'rgba(0,0,0,0.04)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Event Image */}
            {selectedEvent.image && typeof selectedEvent.image === 'string' && (
              <Box
                component="img"
                src={selectedEvent.image}
                alt={selectedEvent.title}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 3,
                  mb: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(90, 12, 119, 0.08)',
                    display: 'flex',
                  }}
                >
                  <EventIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                    Date
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {format(parseISO(selectedEvent.date), 'EEEE, MMMM d, yyyy')}
                  </Typography>
                </Box>
              </Box>

              {selectedEvent.time && (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'rgba(90, 12, 119, 0.08)',
                      display: 'flex',
                    }}
                  >
                    <TimeIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                      Time
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedEvent.time}
                    </Typography>
                  </Box>
                </Box>
              )}

              {selectedEvent.location && (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'rgba(90, 12, 119, 0.08)',
                      display: 'flex',
                    }}
                  >
                    <LocationIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                      Location
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedEvent.location}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {selectedEvent.description && (
              <>
                <Divider sx={{ my: 4 }} />
                <Box>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'center' }}>
                    <DescriptionIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                      About this event
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {selectedEvent.description}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        )}
      </Drawer>
    </Box>
  );
};
