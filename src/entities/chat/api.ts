import { api } from '@/app/redux';

import type { ChatType, ChatsResponseType, CreateChatFormType } from './types';

const baseUrl = 'chat';

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /* Получение списка чатов */
    getChats: builder.query<ChatsResponseType, void>({
      query: () => baseUrl + '/list',
      providesTags: ['chat'],
    }),

    /* Получение чата по id */
    getChatById: builder.query<ChatType, string>({
      query: (id) => baseUrl + `/${id}`,
      providesTags: ['chat'],
    }),

    /* Создание чата */
    createChat: builder.mutation<ChatType, CreateChatFormType>({
      query: (body) => ({
        method: 'POST',
        url: baseUrl,
        body: { ...body, platform: 'WEB' } as CreateChatFormType,
      }),
      invalidatesTags: ['chat'],
    }),

    /* Удаление чата */
    deleteChat: builder.mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: baseUrl + `/${id}`,
      }),
      invalidatesTags: ['chat'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
} = chatApi;
