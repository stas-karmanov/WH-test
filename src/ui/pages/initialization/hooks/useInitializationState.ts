import { useCallback, useState } from 'react';

import { steps } from '../InitializationPage';
import { useApplicationPort } from '../../../../ApplicationContext';
import { useNavigate } from '../../../router/useNavigate';
import { Page } from '../../../router/config';

export interface InitializationState {
  activeStep: number;
  stepState: boolean;

  handleNext(): void;

  makeStepValid(): void;

  makeStepInvalid(): void;
}

const isLastStep = (activeStep: number): boolean => {
  return activeStep === steps.length - 1;
};

export const useInitializationState = (): InitializationState => {
  const applicationPort = useApplicationPort();
  const [activeStep, setActiveStep] = useState(0);
  const [stepState, setStepState] = useState(false);
  const navigate = useNavigate();

  const makeStepValid = useCallback(() => setStepState(true), [setStepState]);
  const makeStepInvalid = useCallback(() => setStepState(false), [setStepState]);

  const handleNext = useCallback(() => {
    if (!stepState) return;

    if (isLastStep(activeStep)) {
      applicationPort.register().then(() => navigate(Page.Login));
    }

    setActiveStep(previous => (previous < steps.length - 1 ? previous + 1 : previous));
  }, [setActiveStep, stepState, activeStep, applicationPort, navigate]);

  return { activeStep, stepState, handleNext, makeStepValid, makeStepInvalid };
};
