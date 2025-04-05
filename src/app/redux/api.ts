import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
export const token: string = import.meta.env.VITE_API_AUTH_TOKEN;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { Authorization: `Bearer ${token}` },
  }),
  tagTypes: ['model', 'chat', 'message'],
  endpoints: () => ({}),
});
