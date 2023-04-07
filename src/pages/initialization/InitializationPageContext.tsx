import React, { createContext, PropsWithChildren } from 'react';

import { InitializationState, useInitializationState } from './hooks/useInitializationState';

export const InitializationPageContext = createContext<InitializationState>({
  activeStep: 0,
  handleNext() {},
  handleBack() {},
});

export const InitializationPageContextProvider = ({ children }: PropsWithChildren) => {
  const state = useInitializationState();

  return <InitializationPageContext.Provider value={state}>{children}</InitializationPageContext.Provider>;
};
