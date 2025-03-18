import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Red
    },
    secondary: {
      main: '#000000', // Black
    },
  },
  breakpoints: {
    values: {
      xs: 0,    // Extra small devices (phones)
      sm: 600,  // Small devices (tablets)
      md: 960,  // Medium devices (desktops)
      lg: 1280, // Large devices (larger desktops)
      xl: 1920, // Extra large devices (big screens)
    },
  },
});

export default theme;
