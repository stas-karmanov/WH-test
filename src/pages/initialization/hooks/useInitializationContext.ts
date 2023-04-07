import { useContext } from 'react';

import { InitializationPageContext } from '../InitializationPageContext';

export const useInitializationContext = () => {
  const context = useContext(InitializationPageContext);
  if (context == null) throw new Error('InitializationPageContext not found.');
  return context;
};
