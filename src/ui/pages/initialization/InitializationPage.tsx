import React, { FC } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';

import { GreetingStep } from './components/GreetingStep';
import { SecretStep } from './components/SecretStep';
import { PasswordStep } from './components/PasswordStep';
import { useInitializationContext } from './hooks/useInitializationContext';

interface StepItem {
  label: string;
  element: JSX.Element;
}

export const steps: StepItem[] = [
  { label: 'Welcome!', element: <GreetingStep /> },
  { label: 'This is your secret', element: <SecretStep /> },
  { label: 'Create a password', element: <PasswordStep /> },
];

export const InitializationPage: FC = () => {
  const { activeStep, stepState, handleNext } = useInitializationContext();
  const ActiveStepComponent: JSX.Element | undefined = steps[activeStep]?.element;

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {ActiveStepComponent}

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={!stepState} onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};
