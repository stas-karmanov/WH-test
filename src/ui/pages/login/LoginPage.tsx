import React, { FC } from 'react';
import { Alert, Box, Button, IconButton, Snackbar, Tooltip, Typography } from '@mui/material';
import { RestartAlt } from '@mui/icons-material';

import { Control } from '../../common/Control';
import { useLoginPageState } from './useLoginPageState';

export const LoginPage: FC = () => {
  const { handleLogin, handleReset, handleBlur, handelInputChange, controls, valid, loginError, setLoginError } = useLoginPageState();

  return (
    <>
      <Box sx={{ m: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box></Box>
        <Typography>Login to proceed</Typography>
        <Tooltip title="Reset app to initial state">
          <IconButton onClick={handleReset}>
            <RestartAlt />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={handleLogin}
      >
        <Control
          sx={{ mr: 1 }}
          type="password"
          label="Password"
          name="password"
          required
          control={controls.password}
          onChange={handelInputChange}
          onBlur={handleBlur}
        ></Control>

        <Button variant="contained" type="submit" disabled={!valid}>
          Login
        </Button>
      </Box>

      <Snackbar
        open={!!loginError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setLoginError('')}
      >
        <Alert severity="error">{loginError}</Alert>
      </Snackbar>
    </>
  );
};
