import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Selector } from '@/shared/ui';
import { ChatInput, ModelItem } from '@/shared/components';

import { useGetModelsQuery } from '@/entities/model';
import { useCreateChatMutation } from '@/entities/chat';
import { useCreateMessageMutation } from '@/entities/message';

const ChatFormWrapper = styled.form`
  gap: 14px;
  display: flex;
  flex-direction: column;
`;

interface Props {
  chatId?: string;
}

export const ChatForm: React.FC<Props> = ({ chatId }) => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = React.useState('');
  const [targetModel, setTargetModel] = React.useState(0);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { data: models, isLoading, isError, isSuccess } = useGetModelsQuery();

  const modelItems = React.useMemo(() => {
    return (
      models?.map((model) => <ModelItem key={model.id} {...model} />) || []
    );
  }, [models]);

  const disabledItems = React.useMemo(() => {
    return (
      models
        ?.map((model, index) =>
          model.allowed_plan_type !== null && model.allowed_plan_type !== 'FREE'
            ? index
            : -1
        )
        .filter((index) => index !== -1) || []
    );
  }, [models]);

  const [createChat, { isLoading: isPendingChat }] = useCreateChatMutation();
  const [createMessage, { isLoading: isPendingMessage }] =
    useCreateMessageMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputValue.trim()) return;
    if (isPendingChat || isPendingMessage) return;

    try {
      if (chatId) {
        return createMessage({
          chatId: chatId,
          message: inputValue.trim(),
        });
      }

      const chat = await createChat({
        name: 'Новый чат',
        modelId: models ? models[targetModel].id : undefined,
      }).unwrap();

      await createMessage({
        chatId: chat.id,
        message: inputValue,
      }).unwrap();

      navigate(`/chat/${chat.id}`);
    } catch (error) {
      console.error('[chat-form]', error);
      toast.error('Произошла ошибка во время создания чата');
    } finally {
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  return (
    <ChatFormWrapper onSubmit={handleSubmit}>
      {!chatId && (
        <Selector
          direction='up'
          values={modelItems}
          targetIndex={targetModel}
          disabled={isError}
          disabledItems={disabledItems}
          isLoading={isLoading}
          onChange={(index) => setTargetModel(index)}
        >
          {isSuccess && modelItems
            ? modelItems[targetModel]
            : 'Возникла ошибка'}
        </Selector>
      )}
      <ChatInput
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        isLoading={isPendingChat || isPendingMessage}
      />
    </ChatFormWrapper>
  );
};
