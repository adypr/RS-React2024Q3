import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mainData } from '../models/data.interface';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest/' }),
  endpoints: (builder) => ({
    fetchAstronomicalObjects: builder.query<
      mainData,
      { currentPage: number; searchQuery: string }
    >({
      query: ({ currentPage, searchQuery }) => {
        const params = new URLSearchParams({
          pageNumber: (currentPage - 1).toString(),
          pageSize: '10',
        });
        if (searchQuery) {
          params.append('name', searchQuery);
        }
        const queryString = params.toString();
        return {
          url: `astronomicalObject/search${queryString ? `?${queryString}` : ''}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
    }),
  }),
});

export const { useFetchAstronomicalObjectsQuery } = api;
