import React, { FC } from 'react';
import { Alert, Box, Snackbar, IconButton, Typography, Tooltip } from '@mui/material';
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
            <Tooltip title="Regenerate secret">
              <IconButton onClick={handleSecretRegeneration}>
                <Autorenew />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Tooltip title="Logout">
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
      <Snackbar open={!!error} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};
