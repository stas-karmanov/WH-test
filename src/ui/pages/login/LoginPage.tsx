import React, { FC } from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material';

import { Control } from '../../common/Control';
import { useLoginPageState } from './useLoginPageState';

export const LoginPage: FC = () => {
  const { handleLogin, handleBlur, handelInputChange, controls, valid, loginError, setLoginError } = useLoginPageState();

  return (
    <>
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
