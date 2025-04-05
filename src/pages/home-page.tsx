import React from 'react';
import styled from 'styled-components';

import { ChatForm } from '@/shared/forms';
import { Container, Heading, Paragraph } from '@/shared/ui';

const HomeWrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  background-color: rgb(var(--sidebar-color));
  overflow: hidden;
`;

const ChatContainer = styled.div`
  gap: 14px;
  flex: 1;
  max-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ChatPlaceholder = styled.section`
  flex: 1;
  width: 100%;
  max-width: 65%;
  margin: 0 auto;
  gap: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export function HomePage(): React.JSX.Element {
  return (
    <HomeWrapper>
      <Container style={{ flex: 1, maxHeight: '100%' }}>
        <ChatContainer>
          <ChatPlaceholder>
            <Heading
              as='h1'
              size='md'
              text='👋 Привет, чем могу быть полезен?'
            />
            <Paragraph>
              Можешь спросить меня о чем угодно! Для выбора модели используй
              раскрывающийся список ниже (По умолчанию ответит ChatGPT)
            </Paragraph>
          </ChatPlaceholder>
          <ChatForm />
        </ChatContainer>
      </Container>
    </HomeWrapper>
  );
}
