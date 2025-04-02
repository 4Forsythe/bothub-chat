import React from 'react';
import styled from 'styled-components';

import { Container } from '@/shared/ui';
import { ChatForm } from '@/shared/forms';
import { ChatMessage } from '@/shared/components';

const ChatWrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  background-color: rgb(var(--sidebar-color));
`;

const ChatContainer = styled.div`
  gap: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Chat: React.FC = () => {
  return (
    <ChatWrapper>
      <Container style={{ flex: 1, padding: '20px' }}>
        <ChatContainer>
          <ChatContainer>
            <ChatMessage role='sad' />
            <ChatMessage role='user' />
          </ChatContainer>
          <ChatForm />
        </ChatContainer>
      </Container>
    </ChatWrapper>
  );
};
