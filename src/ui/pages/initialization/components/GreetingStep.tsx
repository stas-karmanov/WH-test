import React, { useEffect } from 'react';
import { Typography } from '@mui/material';

import { useInitializationContext } from '../hooks/useInitializationContext';

export const GreetingStep = () => {
  const { setStepState } = useInitializationContext();

  useEffect(() => {
    setStepState(true);
  }, [setStepState]);

  return <Typography variant="body1">Welcome to this test extension!</Typography>;
};
