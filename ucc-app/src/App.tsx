import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { churchTheme } from './theme/theme';
import { Navigation } from './components/layout/Navigation';
import { HomePage } from './pages/HomePage';
import { LiveStreamingPage } from './pages/LiveStreamingPage';
import { PhotoGalleryPage } from './pages/PhotoGalleryPage';

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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
