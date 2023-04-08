import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './ui/App';
import { ApplicationContextProvider } from './ApplicationContext';
import { Router } from './ui/router/Router';
import { routerConfig } from './ui/router/config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApplicationContextProvider>
      <Router config={routerConfig}>
        <App />
      </Router>
    </ApplicationContextProvider>
  </React.StrictMode>,
);
