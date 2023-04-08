import React, { FC } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { RouterOutlet } from './router/RouterOutlet';
import { useInitialNavigation } from './useInitialNavigation';

const theme: Theme = createTheme({
  palette: { mode: 'dark' },
});

export const App: FC = () => {
  useInitialNavigation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterOutlet />
    </ThemeProvider>
  );
};
