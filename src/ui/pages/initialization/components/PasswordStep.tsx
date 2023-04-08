import React, { FC, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

import { FormValues, useForm } from '../../../common/useForm';
import { useInitializationContext } from '../hooks/useInitializationContext';
import { useApplicationPort } from '../../../../ApplicationContext';

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
    makeStepInvalid();
  }, [makeStepInvalid]);

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
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        sx={{ mr: 1 }}
        type="password"
        label="Password"
        name="password"
        required
        value={controls.password.value}
        error={!controls.password.valid}
        helperText={!controls.password.valid && controls.password.error}
        onChange={handelInputChange}
        onBlur={handleBlur}
      ></TextField>

      <TextField
        type="password"
        label="Confirm Password"
        name="confirmation"
        required
        value={controls.confirmation.value}
        error={!controls.confirmation.valid}
        helperText={!controls.confirmation.valid && controls.confirmation.error}
        onChange={handelInputChange}
        onBlur={handleBlur}
      ></TextField>
    </Box>
  );
};
