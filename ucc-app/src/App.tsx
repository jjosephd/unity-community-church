import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material';
import { churchTheme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={churchTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className="text-primary font-bold"
          >
            Unity Community Church
          </Typography>

          <Typography variant="h5" color="text.secondary" paragraph>
            Welcome to our informational MVP.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" size="large">
              Join Us Sunday
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Learn More
            </Button>
          </Box>

          <div className="mt-8 p-6 glass rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl">
            <p className="text-charcoal font-medium">
              Glassmorphism test component via Tailwind 4
            </p>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
