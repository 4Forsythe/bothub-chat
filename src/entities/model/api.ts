import { api } from '@/app/redux';

import type { ModelType } from './types';

const baseUrl = 'model';

export const modelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /* Получение списка моделей */
    getModels: builder.query<ModelType[], void>({
      query: () => baseUrl + '/list',
      providesTags: ['model'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetModelsQuery } = modelApi;
