import React, { FC } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';

import { GreetingStep } from './components/GreetingStep';
import { SecretStep } from './components/SecretStep';
import { PasswordStep } from './components/PasswordStep';
import { useInitializationContext } from './hooks/useInitializationContext';

interface StepItem {
  label: string;
  component: FC;
}

export const steps: StepItem[] = [
  { label: 'Welcome!', component: GreetingStep },
  { label: 'This is your secret', component: SecretStep },
  { label: 'Create a password', component: PasswordStep },
];

export const InitializationPage: FC = () => {
  const { activeStep, stepState, handleNext } = useInitializationContext();
  const ActiveStepComponent = steps[activeStep]?.component;

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

      {ActiveStepComponent && <ActiveStepComponent />}

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={!stepState} onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};
