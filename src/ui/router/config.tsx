import React from 'react';

import { RouterConfig } from './Router';
import { InitializationContextProvider } from '../pages/initialization/InitializationContext';
import { InitializationPage } from '../pages/initialization/InitializationPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { GuarderRoute } from './GuarderRoute';

export enum Page {
  Initialization = 'initialization',
  Login = 'login',
  Account = 'account',
}

export const routerConfig: RouterConfig = {
  [Page.Initialization]: (
    <InitializationContextProvider>
      <InitializationPage />
    </InitializationContextProvider>
  ),
  [Page.Login]: <LoginPage />,
  [Page.Account]: (
    <GuarderRoute>
      <AccountPage />
    </GuarderRoute>
  ),
};
