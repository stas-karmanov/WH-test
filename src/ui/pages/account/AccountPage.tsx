import React, { FC } from 'react';
import { Alert, Box, Snackbar, IconButton, Typography, Tooltip } from '@mui/material';
import { Logout, Autorenew } from '@mui/icons-material';

import { useAccountPageState } from './useAccountPageState';
import { Secret } from '../../common/Secret';

export const AccountPage: FC = () => {
  const { user, handleSecretRegeneration, handleLogout, error, setError } = useAccountPageState();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box></Box>
        <Typography variant="h5">Use or regenerate your secret</Typography>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>

      {user && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
          <Secret secret={user.secret} />
          <Tooltip title="Regenerate secret">
            <IconButton onClick={handleSecretRegeneration}>
              <Autorenew />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Snackbar open={!!error} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};
