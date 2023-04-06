import React from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { InitializationPage } from './pages/initialization/InitializationPage';

const theme: Theme = createTheme({
  palette: { mode: 'dark' },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InitializationPage />
    </ThemeProvider>
  );
};
