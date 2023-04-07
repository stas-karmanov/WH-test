import { useCallback, useState } from 'react';

import { steps } from '../InitializationPage';

export interface InitializationState {
  activeStep: number;
  stepState: boolean;
  handleNext(): void;
  handleBack(): void;
  setStepState(state: boolean): void;
}

export const useInitializationState = (): InitializationState => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepState, setStepState] = useState(false);

  const handleNext = useCallback(() => setActiveStep(previous => (previous < steps.length - 1 ? previous + 1 : previous)), [setActiveStep]);
  const handleBack = useCallback(() => setActiveStep(previous => (previous > 0 ? previous - 1 : previous)), [setActiveStep]);

  return { activeStep, stepState, handleNext, handleBack, setStepState };
};
