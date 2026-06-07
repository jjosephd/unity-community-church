# Integrate Sanity Events into Calendar Component

## Tasks
- [x] 1. Update `sanityQueries.ts` to include a query for fetching all events (or all events in a date range).
- [x] 2. Update `CalendarView.tsx` to use `useSanityData` with the new events query instead of Google Calendar.
- [x] 3. Map Sanity event data to the format required by the calendar grid (grouping by day).
- [x] 4. Replace the static side panel with a sliding `Drawer` (mobile-friendly modal sidebar) for event details.
- [x] 5. Style the `Drawer` beautifully to ensure it matches the application's aesthetic.
- [x] 6. Verify that events show correctly on the calendar, click properly, and the drawer opens and closes gracefully.
