import { useContext } from 'react';
import { RouterContext } from './Router';

export const RouterOutlet = () => {
  const { Page } = useContext(RouterContext);
  return <>{Page}</>;
};
