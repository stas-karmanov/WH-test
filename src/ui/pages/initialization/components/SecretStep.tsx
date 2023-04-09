import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useInitializationContext } from '../hooks/useInitializationContext';
import { useApplicationPort } from '../../../../ApplicationContext';
import { Secret } from '../../../common/Secret';

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
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {secret && (
        <>
          <Typography variant="h4" sx={{ mb: 1 }}>
            This is an auto-generated secret
          </Typography>
          <Secret secret={secret} />
          <Typography variant="subtitle2">You can regenerate it later</Typography>
        </>
      )}
    </Box>
  );
};
