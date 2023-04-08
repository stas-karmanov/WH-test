import React, { FC, useEffect, useState } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';

import { UserDto } from '../../core/UserDto';
import { useApplicationPort } from '../../ApplicationContext';

export const AccountPage: FC = () => {
  const applicationPort = useApplicationPort();
  const [user, setUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    applicationPort
      .getCurrentUser()
      .then((dto: UserDto) => setUser(dto))
      .catch((error: unknown) => {
        const message: string = (error as Error).message ?? 'Cannot get user';
        setError(message);
      });
  }, [applicationPort, setUser]);

  return (
    <>
      <Box>{user && user.secret}</Box>
      <Snackbar open={!!error} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};
