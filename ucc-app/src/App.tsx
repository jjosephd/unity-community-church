import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { churchTheme } from './theme/theme';
import { Navigation } from './components/layout/Navigation';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={churchTheme}>
        <CssBaseline />
        <Navigation />
        <Box
          component="main"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            px: 2,
          }}
        >
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: 'rgb(90, 12, 119)' }}
          >
            Unity Community Church
          </h1>
          <p className="text-lg mb-8">Welcome to our informational MVP.</p>

          <div className="glass p-8 rounded-xl max-w-md">
            <p className="font-medium">
              Navigation component is now active! Try scrolling to see the
              glassmorphism effect.
            </p>
          </div>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
