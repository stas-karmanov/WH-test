import React, { FC } from 'react';
import { grey } from '@mui/material/colors';
import { Key } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export interface SecretProps {
  secret: string;
}

export const Secret: FC<SecretProps> = ({ secret }: SecretProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 0.5,
        p: 1,
        borderRadius: 1,
        backgroundColor: grey['900'],
      }}
    >
      <Key sx={{ mr: 1 }} />
      <Typography variant="body1">{secret}</Typography>
    </Box>
  );
};
