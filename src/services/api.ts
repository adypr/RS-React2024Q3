import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mainData } from '../models/data.interface';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest/' }),
  endpoints: (builder) => ({
    fetchAstronomicalObjects: builder.query<mainData, { currentPage: number; searchQuery: string }>({
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
          url: `astronomicalObject/search?${queryString}`,
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

export async function fetchAstronomicalObjects({ currentPage, searchQuery }: { currentPage: number; searchQuery: string }) {
  const params = new URLSearchParams({
    pageNumber: (currentPage - 1).toString(),
    pageSize: '10',
  });
  if (searchQuery) {
    params.append('name', searchQuery);
  }
  const queryString = params.toString();

  const response = await fetch(`https://stapi.co/api/v2/rest/astronomicalObject/search?${queryString}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data: mainData = await response.json();
  return data;
}
