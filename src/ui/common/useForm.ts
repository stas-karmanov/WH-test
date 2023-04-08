import { ChangeEvent, FocusEvent, useCallback, useState } from 'react';

export type FormValues = Record<string, string>;
export type FormValidator<T extends FormValues> = (formValues: T) => boolean;

export interface FormControlConfig<T extends FormValues> {
  initValue: string;
  validator: FormValidator<T>;
  error: string;
}

export interface FormConfig<T extends FormValues> {
  [field: string]: FormControlConfig<T>;
}

export interface FormControl<T extends FormValues> {
  value: string;
  touched: boolean;
  error: string;
  valid: boolean;
  validator: FormValidator<T>;
}

type Controls<T extends FormValues> = Record<string, FormControl<T>>;

const initControls = <T extends FormValues>(config: FormConfig<T>): Controls<T> => {
  const controls: Controls<T> = {};

  for (const [control, { initValue, error, validator }] of Object.entries(config)) {
    controls[control] = { value: initValue, touched: false, error, valid: true, validator };
  }

  return controls;
};

const getFormValues = <T extends FormValues>(controls: Controls<T>): T => {
  const values: FormValues = {};

  for (const [control, { value }] of Object.entries(controls)) {
    values[control] = value;
  }

  return values as T;
};

const validateForm = <T extends FormValues>(controls: Controls<T>): boolean => {
  const formValues = getFormValues(controls);
  return Object.values(controls).every(({ validator }) => validator(formValues));
};

const validateTouchedControls = <T extends FormValues>(controls: Controls<T>): Controls<T> => {
  const updatedControls: Controls<T> = {};

  for (const [name, control] of Object.entries(controls)) {
    if (control.touched) {
      updatedControls[name] = { ...control, valid: control.validator(getFormValues(controls)) };
    }
  }

  return { ...controls, ...updatedControls };
};

export const useForm = <T extends FormValues>(config: FormConfig<T>) => {
  const [controls, updateControls] = useState<Controls<T>>(() => initControls(config));
  const [valid, setValid] = useState<boolean>(false);

  const handelInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      const updatedControl = { ...controls[name], value };
      const updatedControls: Controls<T> = { ...controls, [name]: updatedControl };

      updateControls(validateTouchedControls(updatedControls));
      setValid(validateForm(updatedControls));
    },
    [controls, updateControls],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { name } = event.target;
      const control = controls[name];

      if (!control.touched) {
        const updatedControls: Controls<T> = { ...controls, [name]: { ...control, touched: true } };
        updateControls(validateTouchedControls(updatedControls));
      }
    },
    [controls, updateControls],
  );

  return { controls, valid, handelInputChange, handleBlur };
};
