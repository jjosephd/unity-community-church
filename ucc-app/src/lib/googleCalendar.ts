export interface GoogleEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export const fetchGoogleCalendarEvents = async (
  timeMin: Date,
  timeMax: Date,
): Promise<GoogleEvent[]> => {
  const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    // If keys are missing, we can return empty or throw. Returning a helpful warning.
    console.warn(
      'Google Calendar API key or Calendar ID is missing in environment variables.',
    );
    return [];
  }

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('Failed to fetch events from Google Calendar:', errorDetails);
    throw new Error('Failed to fetch events from Google Calendar');
  }

  const data = await response.json();
  return data.items || [];
};
