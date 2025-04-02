import React from 'react';
import styled from 'styled-components';

import { Avatar, Badge } from '@/shared/ui';
import { ChatCopyButton } from '@/shared/components';

const UserChatMessageWrapper = styled.div`
  gap: 10px;
  width: fit-content;
  max-width: 60%;
  margin-left: auto;
  display: flex;
  align-items: flex-end;
`;

const UserChatMessageContent = styled.div`
  padding: 7px 45px 7px 8px;
  border-radius: 10px 10px 0 10px;
  background-color: rgba(var(--primary-color), 0.5);
  position: relative;
`;

const UserChatMessageText = styled.p`
  padding: 7px 8px;
  font-size: 16px;
`;

const UserChatMessageTimestamp = styled.span`
  right: 8px;
  bottom: 7px;
  font-size: 11px;
  position: absolute;
`;

const ModelChatMessageWrapper = styled.div`
  gap: 10px;
  width: fit-content;
  max-width: 60%;
  display: flex;
  flex-direction: column;
`;

const ModelChatMessageHeader = styled.div`
  gap: 10px;
  padding-left: 52px;
  display: flex;
  align-items: center;
`;

const ModelChatMessageContainer = styled.div`
  gap: 12px;
  display: flex;
  align-items: flex-start;
`;

const ModelChatMessageContent = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ModelChatMessageText = styled.p`
  padding: 8.5px 4px;
  display: flex;
  align-items: flex-start;
`;

const ModelChatMessageFooter = styled.div`
  gap: 14px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ModelChatMessageMeta = styled.div`
  gap: 14px;
  display: flex;
  align-items: center;
`;

const ModelChatMessageScore = styled.span`
  text-transform: uppercase;
  color: rgb(var(--muted-foreground-color));
`;

const ModelChatMessageTimestamp = styled.span`
  font-size: 11px;
  margin-left: auto;
`;

interface Props {
  role: string;
}

export const ChatMessage: React.FC<Props> = ({ role }) => {
  if (role === 'user') {
    return (
      <UserChatMessageWrapper>
        <ChatCopyButton value='типо тестим' />
        <UserChatMessageContent>
          <UserChatMessageText>Привет, бот!</UserChatMessageText>
          <UserChatMessageTimestamp>09:54</UserChatMessageTimestamp>
        </UserChatMessageContent>
        <Avatar />
      </UserChatMessageWrapper>
    );
  }

  return (
    <ModelChatMessageWrapper>
      <ModelChatMessageHeader>
        <span>ChatGPT</span>
        <Badge text='gpt-3.5-turbo' />
      </ModelChatMessageHeader>
      <ModelChatMessageContainer>
        <Avatar url='/icons/ai-models/gpt.svg' />
        <ModelChatMessageContent>
          <ModelChatMessageText>Привет. Чем могу помочь?</ModelChatMessageText>
          <ModelChatMessageFooter>
            <ModelChatMessageMeta>
              <ModelChatMessageScore>-223 Caps</ModelChatMessageScore>
              <ChatCopyButton value='типо тестим' />
            </ModelChatMessageMeta>
            <ModelChatMessageTimestamp>09:54</ModelChatMessageTimestamp>
          </ModelChatMessageFooter>
        </ModelChatMessageContent>
      </ModelChatMessageContainer>
    </ModelChatMessageWrapper>
  );
};
