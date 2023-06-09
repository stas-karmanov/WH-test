import React, { FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { FormValues, useForm } from '../../../common/useForm';
import { useInitializationContext } from '../hooks/useInitializationContext';
import { useApplicationPort } from '../../../../ApplicationContext';
import { Control } from '../../../common/Control';

interface PasswordFormValues extends FormValues {
  password: string;
  confirmation: string;
}

export const PasswordStep: FC = () => {
  const { makeStepValid, makeStepInvalid } = useInitializationContext();
  const applicationPort = useApplicationPort();

  const { controls, valid, handelInputChange, handleBlur } = useForm<PasswordFormValues>({
    password: {
      initValue: '',
      validator(formValues: PasswordFormValues) {
        return !!formValues.password && formValues.password.length >= 8 && formValues.password.length <= 30;
      },
      error: 'Password length must be between 8 and 30',
    },
    confirmation: {
      initValue: '',
      validator(formValues: PasswordFormValues) {
        return (
          !!formValues.confirmation &&
          formValues.confirmation.length >= 8 &&
          formValues.confirmation.length <= 30 &&
          formValues.confirmation === formValues.password
        );
      },
      error: 'Passwords must match',
    },
  });

  useEffect(() => {
    if (!valid) {
      makeStepInvalid();
    } else {
      applicationPort.initializeUser(controls.password.value).then(() => {
        makeStepValid();
      });
    }
  }, [applicationPort, makeStepValid, makeStepInvalid, valid, controls.password.value]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h5">Create a password to complete the initialization</Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          mt: 1,
        }}
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

        <Control
          type="password"
          label="Confirm Password"
          name="confirmation"
          required
          control={controls.confirmation}
          onChange={handelInputChange}
          onBlur={handleBlur}
        ></Control>
      </Box>
    </Box>
  );
};
