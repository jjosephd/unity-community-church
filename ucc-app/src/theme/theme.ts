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
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Alfa Slab One", serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    h2: {
      fontFamily: '"Alfa Slab One", serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    h3: {
      fontFamily: '"Alfa Slab One", serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    h4: {
      fontFamily: '"Alfa Slab One", serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    h5: {
      fontFamily: '"Alfa Slab One", serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    h6: {
      fontFamily: '"Alfa Slab One", serif',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
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
