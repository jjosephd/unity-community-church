import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { churchTheme } from './theme/theme';
import { Navigation } from './components/layout/Navigation';
import { HomePage } from './pages/HomePage';
import { LiveStreamingPage } from './pages/LiveStreamingPage';
import { PhotoGalleryPage } from './pages/PhotoGalleryPage';
import { GivingPage } from './pages/GivingPage';
import { ConnectPage } from './pages/ConnectPage';
import { ImpactStoriesPage } from './pages/ImpactStoriesPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={churchTheme}>
        <CssBaseline />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/media/live-streaming" element={<LiveStreamingPage />} />
          <Route path="/media/gallery" element={<PhotoGalleryPage />} />
          <Route path="/give" element={<GivingPage />} />
          <Route path="/give/online" element={<GivingPage />} />
          <Route path="/give/impact" element={<ImpactStoriesPage />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
