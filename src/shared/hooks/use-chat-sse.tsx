import React from 'react';
import { EventSource } from 'eventsource';

import { useAppDispatch } from '@/app/redux';
import { messageApi, type StreamingMessageType } from '@/entities/message';

const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
const token: string = import.meta.env.VITE_API_AUTH_TOKEN;

type UseChatSSEOptions = {
  deps?: React.DependencyList;
  enable?: boolean;
};

/**
 * Хук для работы с Server-Sent-Events (SSE) для получения данных о потоковом сообщении.
 *
 * Подключается к серверу через `EventSource`, слушает события о создании, обновлении сообщений и обновлении подписки,
 * и обновляет состояние с помощью `RTK-Query` обновления кешей.
 *
 * @param chatId ID чата, для которого будет происходить подписка на события.
 * @param options Дополнительные параметры для настройки хука.
 * @param options.deps Массив зависимостей React.DelepndencyList, определяющий триггеры для возобновления потоковой передачи. По умолчанию пустой.
 * @param options.enable Состояние действующей подписки слушателя. По умолчанию включен.
 *
 * @example
 * useChatSSE(chatId, { enable: true, deps: [chatId] });
 */

export const useChatSSE = (chatId: string, options: UseChatSSEOptions) => {
  const dispatch = useAppDispatch();

  const { enable = true, deps = [] } = options;

  React.useEffect(() => {
    if (!enable) return;

    const eventSource = new EventSource(
      `${baseUrl}/chat/${chatId}/stream?t=${Date.now()}`,
      {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
      }
    );

    eventSource.onmessage = (event) => {
      const response: StreamingMessageType = JSON.parse(event.data);
      const message = response.data.message;

      console.log('SSE', response);

      if (response.name === 'MESSAGE_CREATE') {
        dispatch(
          messageApi.util.updateQueryData('getMessages', chatId, (draft) => {
            const isExists = draft.find((msg) => msg.id === message.id);

            if (!isExists) {
              draft.push(message);
            }
          })
        );
      }

      if (response.name === 'MESSAGE_UPDATE') {
        dispatch(
          messageApi.util.updateQueryData('getMessages', chatId, (draft) => {
            const index = draft.findIndex((msg) => msg.id === message.id);

            if (index !== -1) {
              draft[index] = {
                ...draft[index],
                ...message,
              };
            }
          })
        );
      }

      if (response.name === 'SUBSCRIPTION_UPDATE') {
        eventSource.close();
      }
    };

    eventSource.onerror = (error) => {
      eventSource.close();
      console.error('[use-chat-sse]', error);
    };

    return () => {
      eventSource.close();
    };
  }, [chatId, dispatch, ...deps]);
};
