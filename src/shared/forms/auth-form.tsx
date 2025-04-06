import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import { WelcomeAnimation } from '@/shared/components';
import { Button, FormField, Heading } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { selectAuth, login, setAuthLoading } from '@/entities/auth';

const FormWrapper = styled.div`
  width: 459px;
  max-width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgb(var(--border-color));
  background-color: rgb(var(--secondary-color));
`;

const FormContainer = styled.form`
  flex: 1;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.div`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormHeaderCloseButton = styled.button`
  opacity: 0.5;
  color: rgb(var(--muted-color));
  transition: transform 250ms ease;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1);
  }
`;

export const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectAuth);

  const [loginValue, setLoginValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  /*
    В ИДЕАЛЕ, конечно, React Hook Form + zod/yup, и у меня на GitHub есть достаточно много проектов с их использованием,
    Тут я делать НЕ СТАЛ, поскольку был увлечен реализацией других фич. Надеюсь на ваше понимание 😘 (это большая экономия времени для меня).
  */

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (loginValue && passwordValue) {
      dispatch(setAuthLoading(true));

      setTimeout(() => {
        dispatch(login({ login: loginValue, password: passwordValue }));
        dispatch(setAuthLoading(false));
        navigate('/', { replace: true });
      }, 2500);
    }
  };

  return (
    <React.Fragment>
      <WelcomeAnimation user={loginValue} isVisible={isLoading} />
      <FormWrapper>
        <FormContainer onSubmit={handleSubmit}>
          <FormHeader>
            <Heading as='h5' text='Авторизация' />
            <FormHeaderCloseButton aria-label='Закрыть окно' type='button'>
              <X size={24} />
            </FormHeaderCloseButton>
          </FormHeader>
          <FormField
            label='Логин'
            placeholder='Ваш логин'
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            autoComplete='off'
            required
          />
          <FormField
            label='Пароль'
            type='password'
            placeholder='Ваш пароль'
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            required
          />
          <Button type='submit' style={{ width: '100%' }} isLoading={isLoading}>
            Войти
          </Button>
        </FormContainer>
      </FormWrapper>
    </React.Fragment>
  );
};
