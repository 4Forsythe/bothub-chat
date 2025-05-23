import React from 'react';
import styled from 'styled-components';

import { AuthForm } from '@/shared/forms';

const AuthWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export function AuthPage(): React.JSX.Element {
  return (
    <AuthWrapper>
      <AuthForm />
    </AuthWrapper>
  );
}
