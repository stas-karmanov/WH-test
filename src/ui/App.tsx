import React, { FC } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { InitializationPage } from './pages/initialization/InitializationPage';
import { InitializationContextProvider } from './pages/initialization/InitializationContext';

const theme: Theme = createTheme({
  palette: { mode: 'dark' },
});

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <InitializationContextProvider>
        <InitializationPage />
      </InitializationContextProvider>
    </ThemeProvider>
  );
};
