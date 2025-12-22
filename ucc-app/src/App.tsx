import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { churchTheme } from './theme/theme';
import { Navigation } from './components/layout/Navigation';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={churchTheme}>
        <CssBaseline />
        <Navigation />
        <HomePage />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
