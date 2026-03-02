import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
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
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { fetchGoogleCalendarEvents } from '../../lib/googleCalendar';
import type { GoogleEvent } from '../../lib/googleCalendar';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<GoogleEvent | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // Fetch events for the current month
  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'googleCalendarEvents',
      monthStart.toISOString(),
      monthEnd.toISOString(),
    ],
    queryFn: () => fetchGoogleCalendarEvents(monthStart, monthEnd),
  });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setSelectedEvent(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setSelectedEvent(null);
  };

  // Generate the days for the calendar grid
  const days = useMemo(() => {
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [monthStart, monthEnd]);

  // Map events to days
  const eventsByDay = useMemo(() => {
    const map = new Map<string, GoogleEvent[]>();
    events.forEach((event) => {
      const eventStart = event.start.dateTime
        ? parseISO(event.start.dateTime)
        : event.start.date
          ? parseISO(event.start.date)
          : null;
      if (eventStart) {
        const dateKey = format(eventStart, 'yyyy-MM-dd');
        const existing = map.get(dateKey) || [];
        existing.push(event);
        map.set(dateKey, existing);
      }
    });
    return map;
  }, [events]);

  const handleEventClick = (event: GoogleEvent) => {
    setSelectedEvent(event);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 4,
      }}
    >
      {/* Calendar Grid */}
      <Box sx={{ flex: 2 }}>
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
                          key={evt.id}
                          onClick={() => handleEventClick(evt)}
                          sx={{
                            bgcolor:
                              selectedEvent?.id === evt.id
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
                          {evt.summary}
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

      {/* Event Details Sidebar */}
      <Box sx={{ flex: 1, minWidth: { lg: 320 } }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Event Details
        </Typography>

        {isLoading && (
          <Typography color="text.secondary">
            Loading calendar events...
          </Typography>
        )}

        {error && (
          <Typography color="error">
            Error loading events. Please ensure API keys are set.
          </Typography>
        )}

        {!isLoading && !selectedEvent && events.length > 0 && (
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.5)',
              borderRadius: 3,
              border: '1px dashed rgba(0,0,0,0.1)',
              boxShadow: 'none',
            }}
          >
            <CardContent>
              <Typography color="text.secondary" textAlign="center" py={4}>
                Select an event from the calendar to view details.
              </Typography>
            </CardContent>
          </Card>
        )}

        {!isLoading && events.length === 0 && !error && (
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.5)',
              borderRadius: 3,
              border: '1px dashed rgba(0,0,0,0.1)',
              boxShadow: 'none',
            }}
          >
            <CardContent>
              <Typography color="text.secondary" textAlign="center" py={4}>
                No events scheduled for {format(currentDate, 'MMMM yyyy')}.
              </Typography>
            </CardContent>
          </Card>
        )}

        {selectedEvent && (
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: 'white',
              boxShadow: '0 10px 40px rgba(90, 12, 119, 0.1)',
              border: '1px solid rgba(0,0,0,0.05)',
              animation: 'fadeIn 0.3s ease-in-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                sx={{ color: 'primary.main', fontWeight: 700, mb: 3 }}
              >
                {selectedEvent.summary}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}
                >
                  <EventIcon sx={{ color: 'primary.main', opacity: 0.8 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="text.secondary"
                    >
                      Date
                    </Typography>
                    <Typography variant="body1">
                      {selectedEvent.start.dateTime
                        ? format(
                            parseISO(selectedEvent.start.dateTime),
                            'EEEE, MMMM d, yyyy',
                          )
                        : selectedEvent.start.date
                          ? format(
                              parseISO(selectedEvent.start.date),
                              'EEEE, MMMM d, yyyy',
                            )
                          : 'TBD'}
                    </Typography>
                  </Box>
                </Box>

                {selectedEvent.start.dateTime && (
                  <Box
                    sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}
                  >
                    <TimeIcon sx={{ color: 'primary.main', opacity: 0.8 }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="text.secondary"
                      >
                        Time
                      </Typography>
                      <Typography variant="body1">
                        {format(
                          parseISO(selectedEvent.start.dateTime),
                          'h:mm a',
                        )}
                        {selectedEvent.end.dateTime &&
                          ` - ${format(parseISO(selectedEvent.end.dateTime), 'h:mm a')}`}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {selectedEvent.location && (
                  <Box
                    sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}
                  >
                    <LocationIcon
                      sx={{ color: 'primary.main', opacity: 0.8 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="text.secondary"
                      >
                        Location
                      </Typography>
                      <Typography variant="body1">
                        {selectedEvent.location}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {selectedEvent.description && (
                <Box
                  sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Description
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{
                      __html: selectedEvent.description,
                    }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};
