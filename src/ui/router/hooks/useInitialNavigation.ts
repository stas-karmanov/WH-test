import { useEffect } from 'react';

import { useNavigate } from './useNavigate';
import { useApplicationPort } from '../../../ApplicationContext';
import { Page } from '../config';

export const useInitialNavigation = () => {
  const navigate = useNavigate();
  const applicationPort = useApplicationPort();

  useEffect(() => {
    Promise.all([applicationPort.isAuthenticated(), applicationPort.isInitialized()]).then(
      ([isAuthenticated, isInitialized]: [boolean, boolean]) => {
        if (isAuthenticated && isInitialized) {
          navigate(Page.Account);
        } else if (isInitialized) {
          navigate(Page.Login);
        } else {
          navigate(Page.Initialization);
        }
      },
    );
  }, [applicationPort, navigate]);
};
