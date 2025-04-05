import React from 'react';
import styled from 'styled-components';

import { Avatar, Badge } from '@/shared/ui';
import { ChatCopyButton } from '@/shared/components';
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
`;

const UserChatMessageContent = styled.div`
  min-height: 51px;
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
  min-height: 51px;
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
          <UserChatMessageText>{content}</UserChatMessageText>
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
        <Avatar
          url={iconFile}
          backgroundColor={model.message_color ?? undefined}
        />
        <ModelChatMessageContent>
          <ModelChatMessageText>
            {status === 'PENDING' && !content ? '...' : content}
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
