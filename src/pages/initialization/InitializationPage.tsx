import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';

import { GreetingStep } from './components/GreetingStep';
import { SecretStep } from './components/SecretStep';
import { PasswordStep } from './components/PasswordStep';

interface StepItem {
  label: string;
  component: () => JSX.Element;
}

const steps: StepItem[] = [
  { label: 'Welcome!', component: GreetingStep },
  { label: 'This is your secret', component: SecretStep },
  { label: 'Create a password', component: PasswordStep },
];

export const InitializationPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(previous => (previous < steps.length - 1 ? previous + 1 : previous));
  const handleBack = () => setActiveStep(previous => (previous > 0 ? previous - 1 : previous));

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
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
      </Box>
    </Box>
  );
};
