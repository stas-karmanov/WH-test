import React, { FC } from 'react';
import { Alert, Box, Snackbar, IconButton, Typography } from '@mui/material';
import { Logout, Autorenew } from '@mui/icons-material';

import { useAccountPageState } from './useAccountPageState';

export const AccountPage: FC = () => {
  const { user, handleSecretRegeneration, handleLogout, error, setError } = useAccountPageState();

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
