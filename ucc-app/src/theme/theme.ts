import { createTheme } from '@mui/material/styles';

export const churchTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(90, 12, 119)', // Royal Purple
    },
    background: {
      default: '#FDF8F3', // Soft Cream
    },
    text: {
      primary: '#1A1A1A', // Charcoal
    },
  },
  typography: {
    fontFamily:
      '"Open Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 28px',
          fontWeight: 600,
        },
      },
    },
  },
});
