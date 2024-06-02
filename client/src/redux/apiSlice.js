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
    signIn: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
