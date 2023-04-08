import { createContext, PropsWithChildren, useContext } from 'react';

import { ApplicationPort } from './core/ports/ApplicationPort';
import { ApplicationFactory } from './ApplicationFactory';

const applicationPort: ApplicationPort = ApplicationFactory.create();

export const ApplicationContext = createContext<ApplicationPort>(applicationPort);

export const ApplicationContextProvider = ({ children }: PropsWithChildren) => {
  return <ApplicationContext.Provider value={applicationPort}>{children}</ApplicationContext.Provider>;
};

export const useApplicationPort = () => useContext(ApplicationContext);
