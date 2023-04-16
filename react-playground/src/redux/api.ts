import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_ACCESS_TOKEN } from '../shared/constants';
import { ApiResponse, FullPhotoDTO } from './home/models';

interface RequestParams {
  query: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set('Accept', 'application/json');
      headers.set('Accept-Version', 'v1');
      headers.set('Authorization', `Client-ID ${API_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getPhotoList: builder.query<ApiResponse, RequestParams>({
        query: (params: RequestParams) => {
          const { query } = params;
          return `/search/photos?query=${query}`;
        },
      }),
      getOnePhoto: builder.query<FullPhotoDTO, string>({
        query: (id: string) => {
          return `/photos/${id}`;
        },
      }),
    };
  },
});

export const { useGetPhotoListQuery, useGetOnePhotoQuery } = apiSlice;
