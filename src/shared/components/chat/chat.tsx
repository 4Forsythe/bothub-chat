import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Heading, Paragraph } from '@/shared/ui';
import { ChatMessage } from '@/shared/components';
import { useScrollDown } from '@/shared/hooks';

import type { ChatType } from '@/entities/chat';
import type { MessageType } from '@/entities/message';

const ChatWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--sidebar-color));
  position: relative;
  overflow: hidden;
`;

const ChatContainer = styled.div`
  flex: 1;
  gap: 14px;
  max-height: 100%;
  margin-bottom: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  animation: fade-in 0.3s ease-out;

  &::after {
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    height: 50px;
    pointer-events: none;
    background: linear-gradient(
      to top,
      rgba(var(--sidebar-color), 0.8),
      transparent
    );
    position: absolute;
  }
`;

const ChatPlaceholder = styled.section`
  flex: 1;
  gap: 14px;
  width: 100%;
  max-width: 65%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

interface Props {
  chat?: ChatType;
  messages?: MessageType[];
}

export const Chat: React.FC<Props> = ({ chat, messages }) => {
  const { chatId } = useParams();

  const scrollRef = useScrollDown([messages, chatId]);

  return (
    <ChatWrapper>
      {chat && messages ? (
        <ChatContainer ref={scrollRef}>
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <ChatMessage
                key={`${message.id}-${message.content?.length}`}
                data={message}
                model={chat.model}
              />
            ))}
        </ChatContainer>
      ) : (
        <ChatPlaceholder>
          <Heading as='h1' size='md' text='👋 Привет, чем могу быть полезен?' />
          <Paragraph>
            Можешь спросить меня о чем угодно! Для выбора модели используй
            раскрывающийся список ниже (По умолчанию ответит ChatGPT)
          </Paragraph>
        </ChatPlaceholder>
      )}
    </ChatWrapper>
  );
};
