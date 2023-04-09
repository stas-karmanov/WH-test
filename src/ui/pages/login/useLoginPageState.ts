import { FormEvent, useState } from 'react';

import { useApplicationPort } from '../../../ApplicationContext';
import { useNavigate } from '../../router/useNavigate';
import { FormValues, useForm } from '../../common/useForm';
import { Page } from '../../router/config';

export interface LoginFormValues extends FormValues {
  password: string;
}

export const useLoginPageState = () => {
  const applicationPort = useApplicationPort();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>('');

  const { controls, valid, handelInputChange, handleBlur } = useForm<LoginFormValues>({
    password: {
      initValue: '',
      validator(values: LoginFormValues) {
        return !!values.password;
      },
      error: 'Required field',
    },
  });

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError('');

    try {
      await applicationPort.login(controls.password.value);
      navigate(Page.Account);
    } catch (error: unknown) {
      const message = (error as Error)?.message ?? 'Login error';
      setLoginError(message);
    }
  };

  const handleReset = async () => {
    await applicationPort.reset();
    navigate(Page.Initialization);
  };

  return { loginError, controls, valid, handleLogin, handleReset, handelInputChange, setLoginError, handleBlur };
};
