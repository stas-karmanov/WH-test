import { useApplicationPort } from '../../../ApplicationContext';
import { useNavigate } from '../../router/useNavigate';
import { useCallback, useEffect, useState } from 'react';
import { UserDto } from '../../../core/UserDto';
import { Page } from '../../router/config';

export const useAccountPageState = () => {
  const applicationPort = useApplicationPort();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string>('');

  const loadUser = useCallback(() => {
    applicationPort
      .getCurrentUser()
      .then((dto: UserDto) => setUser(dto))
      .catch((error: unknown) => {
        const message: string = (error as Error)?.message ?? 'Cannot get user';
        setError(message);
      });
  }, [applicationPort, setUser]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = async () => {
    await applicationPort.logout();
    navigate(Page.Login);
  };

  const handleSecretRegeneration = async () => {
    await applicationPort.regenerateSecret();
    loadUser();
  };

  return { user, error, handleLogout, handleSecretRegeneration, setError };
};
