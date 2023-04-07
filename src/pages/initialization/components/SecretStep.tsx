import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { useInitializationContext } from '../hooks/useInitializationContext';

export const SecretStep = () => {
  const { setStepState } = useInitializationContext();

  useEffect(() => {
    setStepState(true);
  }, [setStepState]);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '80%' }}>
        <Typography variant="body1">EifkiEFiwfwefol13</Typography>
      </Box>
    </Box>
  );
};
