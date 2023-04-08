import { useContext } from 'react';

import { InitializationContext } from '../InitializationContext';

export const useInitializationContext = () => {
  const context = useContext(InitializationContext);
  if (context == null) throw new Error('InitializationPageContext not found.');
  return context;
};
