import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button, Heading, Paragraph } from '@/shared/ui';

import type { ErrorResponseType } from '@/shared/types';

const ErrorBlockWrapper = styled.section`
  flex: 1;
  gap: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgb(var(--danger-color));
  border-radius: 18px;
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 24px;
`;

interface Props {
  error: ErrorResponseType;
}

export const ErrorBlock: React.FC<Props> = ({ error }) => {
  const navigate = useNavigate();

  return (
    <ErrorBlockWrapper>
      <ErrorBlockContainer>
        <Heading size='lg' text={error.status.toString()} />
      </ErrorBlockContainer>
      <StyledParagraph>
        Возникла непредвиденная ошибка на стороне сервера
      </StyledParagraph>
      <Button onClick={() => navigate('/', { replace: true })}>
        Вернуться назад
      </Button>
    </ErrorBlockWrapper>
  );
};
