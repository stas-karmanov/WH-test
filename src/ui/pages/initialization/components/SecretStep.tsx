import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useInitializationContext } from '../hooks/useInitializationContext';
import { useApplicationPort } from '../../../../ApplicationContext';

export const SecretStep: FC = () => {
  const { makeStepValid, makeStepInvalid } = useInitializationContext();
  const [secret, setSecret] = useState('');
  const applicationPort = useApplicationPort();

  useEffect(() => {
    makeStepInvalid();

    applicationPort.initializeSecret().then((s: string) => {
      setSecret(s);
      makeStepValid();
    });
  }, [applicationPort, makeStepInvalid, makeStepValid]);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '80%' }}>
        <Typography variant="body1">{secret}</Typography>
      </Box>
    </Box>
  );
};
