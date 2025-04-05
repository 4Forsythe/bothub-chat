import React from 'react';
import styled from 'styled-components';
import { Loader } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';

import { Container } from '@/shared/ui';
import { ChatForm } from '@/shared/forms';
import { Chat, ErrorBlock } from '@/shared/components';
import { useGetChatByIdQuery } from '@/entities/chat';
import { useGetMessagesQuery } from '@/entities/message';
import { useChatSSE } from '@/shared/hooks';

import type { ErrorResponseType } from '@/shared/types';

const ChatWrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  background-color: rgb(var(--sidebar-color));
  position: relative;
  overflow: hidden;
`;

const ChatContainer = styled.div`
  flex: 1;
  gap: 14px;
  max-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ChatContentSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const LoaderWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLoader = styled(Loader)`
  align-self: center;
  justify-self: center;
  color: rgba(var(--muted-color), 0.75);
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export function ChatPage(): React.JSX.Element {
  const { id } = useParams();

  if (!id) return <Navigate to='/404' replace />;

  const { data: chat } = useGetChatByIdQuery(id);

  const {
    data: messages,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetMessagesQuery(id);

  useChatSSE(id, {
    deps: [isFetching],
    enable: Boolean(messages && !isLoading && !isFetching),
  });

  if (isError) {
    return <ErrorBlock error={error as ErrorResponseType} />;
  }

  return (
    <ChatWrapper>
      <Container style={{ flex: 1, maxHeight: '100%' }}>
        <ChatContainer>
          <ChatContentSection>
            {isLoading ? (
              <LoaderWrapper>
                <StyledLoader size={24} />
              </LoaderWrapper>
            ) : (
              !isLoading && messages && <Chat chat={chat} messages={messages} />
            )}
          </ChatContentSection>
          <ChatForm chatId={id} />
        </ChatContainer>
      </Container>
    </ChatWrapper>
  );
}
