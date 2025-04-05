import { api } from '@/app/redux';

import type {
  MessageType,
  CreateMessageFormType,
  CreateMessageResponseType,
} from './types';

const baseUrl = 'message';

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /* Получение списка сообщений */
    getMessages: builder.query<MessageType[], string>({
      query: (chatId) => ({
        url: baseUrl + '/list-all',
        params: { chatId },
      }),
      providesTags: ['message'],
    }),

    /* Отправка сообщения */
    createMessage: builder.mutation<
      CreateMessageResponseType,
      CreateMessageFormType
    >({
      query: (body) => ({
        method: 'POST',
        url: baseUrl + '/send',
        body: { ...body, platform: 'MAIN' } as CreateMessageFormType,
      }),
      invalidatesTags: ['message'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messageApi;
