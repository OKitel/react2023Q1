import 'whatwg-fetch';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_ACCESS_TOKEN } from '../shared/constants';
import {
  ApiResponse,
  CardData,
  FullPhotoDTO,
  PhotoDTO,
  TransformedApiResponse,
} from './home/models';

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
      getPhotoList: builder.query<TransformedApiResponse, RequestParams>({
        query: (params: RequestParams) => {
          const { query } = params;
          return `/search/photos?query=${query || 'wolves'}`;
        },
        transformResponse: (response: ApiResponse): TransformedApiResponse => {
          return {
            total: response.total,
            totalPages: response.total_pages,
            cards: response.results.map((item: PhotoDTO): CardData => {
              return {
                id: item.id,
                imgSrc: item.urls.small,
                alt: item.alt_description,
                likes: item.likes,
              };
            }),
          };
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
