import { createContext, FC, useState } from 'react';

export interface RouterConfig {
  [page: string]: JSX.Element;
}

export interface RouterState {
  activePage: string;
  setActivePage(page: string): void;
}

export const RouterContext = createContext<RouterState>({
  activePage: '',
  setActivePage(_page: string) {},
});

export interface RouterProps {
  config: RouterConfig;
}

export const Router: FC<RouterProps> = ({ config }: RouterProps) => {
  const [activePage, setActivePage] = useState('initialization');
  const Page: JSX.Element | undefined = config[activePage];
  return <RouterContext.Provider value={{ activePage, setActivePage }}>{Page}</RouterContext.Provider>;
};
