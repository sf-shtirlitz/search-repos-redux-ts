import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Root } from '../../models/search.interface';
 
const repositoriesApi = createApi({
  reducerPath: 'repositories',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://registry.npmjs.com/-/v1',
  }),
  tagTypes: ['Repository', 'Search'],
  endpoints(builder) {
    return {
      fetchRepositories: builder.query<Root, string>({
        providesTags: (result) =>
          result
            ? [
                ...result.objects.map((object) => ({
                  type: 'Search' as const,
                  object,
                })),
                'Search',
              ]
            : ['Search'],
        query: (text) => {
          const size = 25;
          return {
            url: '/search',
            params: {
              text,
              size,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});
 
export const {
  useFetchRepositoriesQuery,
} = repositoriesApi;
export { repositoriesApi };