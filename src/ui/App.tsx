import React, { FC, useEffect } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { RouterOutlet } from './router/RouterOutlet';
import { useNavigate } from './router/useNavigate';
import { Page } from './router/config';

const theme: Theme = createTheme({
  palette: { mode: 'dark' },
});

export const App: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(Page.Login);
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterOutlet />
    </ThemeProvider>
  );
};
