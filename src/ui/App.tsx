import React, { FC } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { InitializationPage } from './pages/initialization/InitializationPage';
import { InitializationContextProvider } from './pages/initialization/InitializationContext';
import { Router, RouterConfig } from './router/Router';
import { LoginPage } from './pages/LoginPage';

const theme: Theme = createTheme({
  palette: { mode: 'dark' },
});

const routerConfig: RouterConfig = {
  initialization: (
    <InitializationContextProvider>
      <InitializationPage />
    </InitializationContextProvider>
  ),
  login: <LoginPage />,
};

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router config={routerConfig}></Router>
    </ThemeProvider>
  );
};
