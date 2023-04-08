import { useEffect } from 'react';

import { useNavigate } from './router/useNavigate';
import { useApplicationPort } from '../ApplicationContext';
import { Page } from './router/config';

export const useInitialNavigation = () => {
  const navigate = useNavigate();
  const applicationPort = useApplicationPort();

  useEffect(() => {
    applicationPort.isAuthenticated().then((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        navigate(Page.Account);
      } else {
        navigate(Page.Login);
      }
    });
  }, [applicationPort, navigate]);
};
