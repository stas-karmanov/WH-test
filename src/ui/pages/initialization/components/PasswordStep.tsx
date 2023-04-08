import React, { FC, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

import { useInitializationContext } from '../hooks/useInitializationContext';
import { useApplicationPort } from '../../../../ApplicationContext';

export const PasswordStep: FC = () => {
  const { makeStepValid, makeStepInvalid } = useInitializationContext();
  const applicationPort = useApplicationPort();

  useEffect(() => {
    makeStepInvalid();
  }, [makeStepInvalid]);

  useEffect(() => {
    applicationPort.initializeUser('tempPass').then(() => {
      makeStepValid();
    });
  }, [applicationPort, makeStepValid]);

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField type="password" label="Password" required></TextField>
      <TextField type="password" label="Confirm Password" required></TextField>
    </Box>
  );
};
