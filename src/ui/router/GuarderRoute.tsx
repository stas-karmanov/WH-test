import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { useApplicationPort } from '../../ApplicationContext';

export const GuarderRoute: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const applicationPort = useApplicationPort();
  const [isAuth, setAuthState] = useState<boolean>(false);

  useEffect(() => {
    applicationPort.isAuthenticated().then((isAuthenticated: boolean) => {
      setAuthState(isAuthenticated);
    });
  }, [setAuthState, applicationPort]);

  return <>{isAuth && children}</>;
};
