import React, { useEffect } from 'react';
import { useInitializationContext } from '../hooks/useInitializationContext';

export const PasswordStep = () => {
  const { setStepState } = useInitializationContext();

  useEffect(() => {
    setStepState(false);
  }, [setStepState]);

  return <div>Create a password</div>;
};
