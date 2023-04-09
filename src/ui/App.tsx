import React, { FC } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import { RouterOutlet } from './router/RouterOutlet';
import { useInitialNavigation } from './router/hooks/useInitialNavigation';

let theme: Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: '600px',
          minHeight: '205px',
        },
      },
    },
  },
  palette: { mode: 'dark' },
});

theme = createTheme(theme, {
  components: {
    MuiTypography: {
      styleOverrides: {
        subtitle2: {
          color: theme.palette.text.secondary,
        },
      },
    },
  },
});

export const App: FC = () => {
  useInitialNavigation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ m: 2 }}>
        <RouterOutlet />
      </Box>
    </ThemeProvider>
  );
};
