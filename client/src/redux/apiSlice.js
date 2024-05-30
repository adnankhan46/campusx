import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
