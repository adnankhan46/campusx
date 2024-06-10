// authApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = "/api";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
        url: `${BASE_URL}/auth/signup`,
        method: 'POST',
        body: formData,
      }),
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: `${BASE_URL}/auth/signin`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  // Define the middleware to handle the response and set cookies
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((next) => async (args) => {
      if (args.endpointName === 'signIn' || args.endpointName === 'signUp') {
        const result = await next(args);
        const { response } = result;
        const token = response?.headers?.get('set-cookie');
        if (token) {
          // Set the received token as a cookie
          document.cookie = token;
        }
        return result;
      }
      return next(args);
    }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
