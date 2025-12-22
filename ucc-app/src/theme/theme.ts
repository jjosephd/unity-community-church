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
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
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
