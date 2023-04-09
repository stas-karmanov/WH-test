import React, { FC } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { RouterOutlet } from './router/RouterOutlet';
import { useInitialNavigation } from './useInitialNavigation';
import { Box } from '@mui/material';

const theme: Theme = createTheme({
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
