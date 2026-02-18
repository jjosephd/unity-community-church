import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { churchTheme } from './theme/theme';
import { Navigation } from './components/layout/Navigation';
import { HomePage } from './pages/HomePage';
import { SermonsPage } from './pages/SermonsPage';
import { EventsPage } from './pages/EventsPage';
import { AboutStoryPage } from './pages/AboutStoryPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { LiveStreamingPage } from './pages/LiveStreamingPage';
import { PhotoGalleryPage } from './pages/PhotoGalleryPage';
import { GivingPage } from './pages/GivingPage';
import { ConnectPage } from './pages/ConnectPage';
import { ImpactStoriesPage } from './pages/ImpactStoriesPage';
import { OutreachPage } from './pages/OutreachPage';

/** Shared query client — lives at module scope so it survives re-renders. */
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={churchTheme}>
          <CssBaseline />
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sermons" element={<SermonsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about/story" element={<AboutStoryPage />} />
            <Route path="/about/leadership" element={<LeadershipPage />} />
            <Route
              path="/media/live-streaming"
              element={<LiveStreamingPage />}
            />
            <Route path="/media/gallery" element={<PhotoGalleryPage />} />
            <Route path="/give" element={<GivingPage />} />
            <Route path="/give/online" element={<GivingPage />} />
            <Route path="/give/impact" element={<ImpactStoriesPage />} />
            <Route path="/ministries/outreach" element={<OutreachPage />} />
            <Route path="/connect" element={<ConnectPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
