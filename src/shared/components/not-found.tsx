import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button, Heading, Paragraph } from '@/shared/ui';

const NotFoundWrapper = styled.section`
  flex: 1;
  gap: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 24px;
`;

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <Heading size='lg' text='Упс... 404' />
      <StyledParagraph>
        Кажется, страница, на которую вы попали, не была найдена
      </StyledParagraph>
      <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
    </NotFoundWrapper>
  );
};
