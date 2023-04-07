import React from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { InitializationPage } from './pages/initialization/InitializationPage';
import { InitializationPageContextProvider } from './pages/initialization/InitializationPageContext';

const theme: Theme = createTheme({
  palette: { mode: 'dark' },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <InitializationPageContextProvider>
        <InitializationPage />
      </InitializationPageContextProvider>
    </ThemeProvider>
  );
};
