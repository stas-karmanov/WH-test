import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, Box, Snackbar, IconButton, Typography } from '@mui/material';
import { Logout, Autorenew } from '@mui/icons-material';

import { UserDto } from '../../core/UserDto';
import { useApplicationPort } from '../../ApplicationContext';
import { useNavigate } from '../router/useNavigate';
import { Page } from '../router/config';

export const AccountPage: FC = () => {
  const applicationPort = useApplicationPort();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string>('');

  const loadUser = useCallback(() => {
    applicationPort
      .getCurrentUser()
      .then((dto: UserDto) => setUser(dto))
      .catch((error: unknown) => {
        const message: string = (error as Error).message ?? 'Cannot get user';
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

  return (
    <>
      <Box>
        {user && (
          <>
            <Typography>{user.secret}</Typography>
            <IconButton onClick={handleSecretRegeneration}>
              <Autorenew />
            </IconButton>
          </>
        )}
        <IconButton onClick={handleLogout}>
          <Logout />
        </IconButton>
      </Box>
      <Snackbar open={!!error} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};
