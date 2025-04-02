import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

import { Button, FormField, Heading } from '@/shared/ui';

const FormWrapper = styled.div`
  width: 459px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgb(var(--border-color));
  background-color: rgb(var(--secondary-color));
`;

const FormContainer = styled.div`
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
  return (
    <FormWrapper>
      <FormContainer>
        <FormHeader>
          <Heading text='Авторизация' />
          <FormHeaderCloseButton>
            <X size={24} />
          </FormHeaderCloseButton>
        </FormHeader>
        <FormField label='Логин' placeholder='Ваш логин' required />
        <FormField label='Пароль' placeholder='Ваш пароль' required />
        <Button style={{ width: '100%' }} type='button'>
          Войти
        </Button>
      </FormContainer>
    </FormWrapper>
  );
};
