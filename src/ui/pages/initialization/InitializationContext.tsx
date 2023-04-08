import React, { createContext, PropsWithChildren } from 'react';

import { InitializationState, useInitializationState } from './hooks/useInitializationState';

export const InitializationContext = createContext<InitializationState>({
  activeStep: 0,
  stepState: false,
  handleNext() {},
  handleBack() {},
  setStepState(_state: boolean) {},
});

export const InitializationContextProvider = ({ children }: PropsWithChildren) => {
  const state = useInitializationState();

  return <InitializationContext.Provider value={state}>{children}</InitializationContext.Provider>;
};
