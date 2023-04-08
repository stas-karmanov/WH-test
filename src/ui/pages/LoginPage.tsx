import React, { FC, FormEvent, useState } from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material';

import { Control } from '../common/Control';
import { FormValues, useForm } from '../common/useForm';
import { useApplicationPort } from '../../ApplicationContext';
import { useNavigate } from '../router/useNavigate';
import { Page } from '../router/config';

interface LoginFormValues extends FormValues {
  password: string;
}

export const LoginPage: FC = () => {
  const applicationPort = useApplicationPort();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>('');

  const { controls, valid, handelInputChange, handleBlur } = useForm<LoginFormValues>({
    password: {
      initValue: '',
      validator(values: LoginFormValues) {
        return !!values.password;
      },
      error: 'Required field',
    },
  });

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError('');

    try {
      await applicationPort.login(controls.password.value);
      navigate(Page.Account);
    } catch (error: unknown) {
      const message = (error as Error).message ?? 'Login error';
      setLoginError(message);
    }
  };

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
