import { createContext, FC, PropsWithChildren, useState } from 'react';

export interface RouterConfig {
  [page: string]: JSX.Element;
}

export interface RouterState {
  activePage: string;
  Page?: JSX.Element;

  setActivePage(page: string): void;
}

export const RouterContext = createContext<RouterState>({
  activePage: '',
  setActivePage(_page: string) {},
});

export interface RouterProps extends PropsWithChildren {
  config: RouterConfig;
}

export const Router: FC<RouterProps> = ({ config, children }: RouterProps) => {
  const [activePage, setActivePage] = useState<string>('');
  const Page: JSX.Element | undefined = config[activePage];
  return <RouterContext.Provider value={{ activePage, Page, setActivePage }}>{children}</RouterContext.Provider>;
};
