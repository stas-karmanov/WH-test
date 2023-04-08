import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './ui/App';
import { ApplicationContextProvider } from './ApplicationContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApplicationContextProvider>
      <App />
    </ApplicationContextProvider>
  </React.StrictMode>,
);
