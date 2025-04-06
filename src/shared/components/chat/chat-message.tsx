import React from 'react';
import styled from 'styled-components';

import { ChatCopyButton } from '@/shared/components';
import { Avatar, Badge, MessageMarkdown } from '@/shared/ui';
import { modelIcons } from '@/shared/constants';

import type { ModelType } from '@/entities/model';
import type { MessageType } from '@/entities/message';

const UserChatMessageWrapper = styled.div`
  gap: 10px;
  width: fit-content;
  max-width: 60%;
  margin-left: auto;
  display: flex;
  align-items: flex-end;

  @media (max-width: 768px) {
    max-width: 75%;
  }
  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

const UserChatMessageContent = styled.div`
  min-height: 51px;
  padding: 7px 45px 7px 8px;
  border-radius: 10px 10px 0 10px;
  background-color: rgba(var(--primary-color), 0.5);
  position: relative;
`;

const UserChatMessageText = styled.div`
  padding: 7px 8px;
  font-size: 16px;
  word-break: break-word;
  overflow-wrap: break-word;
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
  max-width: 70%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 85%;
  }
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const ModelChatMessageHeader = styled.div`
  gap: 10px;
  max-width: 100%;
  padding-left: 52px;
  display: flex;
  align-items: center;
`;

const ModelChatMessageContainer = styled.div`
  gap: 12px;
  max-width: 100%;
  display: flex;
  align-items: flex-start;
  position: relative;
`;

const ModelChatMessageContent = styled.div`
  gap: 8px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  text-wrap: pretty;
  overflow-wrap: break-word;
`;

const ModelChatMessageText = styled.div`
  max-width: 100%;
  min-height: 51px;
  word-break: break-word;
  overflow-wrap: break-word;
  padding: 8.5px 4px;
  display: flex;
  align-items: flex-start;
  text-wrap: pretty;
  overflow-wrap: break-word;
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
`;

const StyledAvatarContainer = styled.div`
  top: 20px;
  position: sticky;
`;

interface Props {
  data: MessageType;
  model: ModelType;
}

export const ChatMessage: React.FC<Props> = ({ data, model }) => {
  const { role, status, content, tokens, model_id, created_at } = data;

  const iconFile = modelIcons.includes(`${model.id}.svg`)
    ? `/icons/ai-models/${model.id}.svg`
    : undefined;

  const timestamp = new Date(created_at).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (role === 'user') {
    return (
      <UserChatMessageWrapper>
        <ChatCopyButton value={content} />
        <UserChatMessageContent>
          <UserChatMessageText>
            <MessageMarkdown>{content}</MessageMarkdown>
          </UserChatMessageText>
          <UserChatMessageTimestamp>{timestamp}</UserChatMessageTimestamp>
        </UserChatMessageContent>
        <Avatar />
      </UserChatMessageWrapper>
    );
  }

  return (
    <ModelChatMessageWrapper>
      <ModelChatMessageHeader>
        <span>{model.label}</span>
        {model_id && <Badge text={model_id} />}
      </ModelChatMessageHeader>
      <ModelChatMessageContainer>
        <StyledAvatarContainer>
          <Avatar
            url={iconFile}
            backgroundColor={model.message_color ?? undefined}
          />
        </StyledAvatarContainer>
        <ModelChatMessageContent>
          <ModelChatMessageText>
            <MessageMarkdown>
              {status === 'PENDING' && !content
                ? '...'
                : content ?? '*молчание*'}
            </MessageMarkdown>
          </ModelChatMessageText>
          {status === 'DONE' && (
            <ModelChatMessageFooter>
              <ModelChatMessageMeta>
                <ModelChatMessageScore>-{tokens} Caps</ModelChatMessageScore>
                <ChatCopyButton value={content} />
              </ModelChatMessageMeta>
              <ModelChatMessageTimestamp>{timestamp}</ModelChatMessageTimestamp>
            </ModelChatMessageFooter>
          )}
        </ModelChatMessageContent>
      </ModelChatMessageContainer>
    </ModelChatMessageWrapper>
  );
};
