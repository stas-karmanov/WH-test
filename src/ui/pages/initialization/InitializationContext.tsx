import React, { createContext, FC, PropsWithChildren } from 'react';

import { InitializationState, useInitializationState } from './hooks/useInitializationState';

export const InitializationContext = createContext<InitializationState>({
  activeStep: 0,
  stepState: false,
  handleNext() {},
  makeStepInvalid() {},
  makeStepValid() {},
});

export const InitializationContextProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const state = useInitializationState();
  return <InitializationContext.Provider value={state}>{children}</InitializationContext.Provider>;
};
