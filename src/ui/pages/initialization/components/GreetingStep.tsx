import React, { FC, useEffect } from 'react';
import { Typography } from '@mui/material';

import { useInitializationContext } from '../hooks/useInitializationContext';

export const GreetingStep: FC = () => {
  const { makeStepValid } = useInitializationContext();

  useEffect(() => {
    makeStepValid();
  }, [makeStepValid]);

  return <Typography variant="body1">Welcome to this test extension!</Typography>;
};
