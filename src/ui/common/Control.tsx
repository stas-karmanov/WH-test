import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { FormControl, FormValues } from './useForm';

export type ControlProps<T extends FormValues> = TextFieldProps & {
  control: FormControl<T>;
};

export const Control = <T extends FormValues>({ control, ...other }: ControlProps<T>) => {
  return <TextField value={control.value} error={!control.valid} helperText={!control.valid && control.error} {...other}></TextField>;
};
