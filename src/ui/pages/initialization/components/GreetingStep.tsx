import React, { FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { useInitializationContext } from '../hooks/useInitializationContext';

export const GreetingStep: FC = () => {
  const { makeStepValid } = useInitializationContext();

  useEffect(() => {
    makeStepValid();
  }, [makeStepValid]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h4">Welcome to this extension!</Typography>
      <Typography variant="subtitle2">Press next to continue</Typography>
    </Box>
  );
};
