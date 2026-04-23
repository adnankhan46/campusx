import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = import.meta.env.VITE_API_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    // Sign UP
    signUp: builder.mutation({
      query: (formData) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: formData,
      }),
    }),
    // Sign IN
    signIn: builder.mutation({
      query: (credentials) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: credentials,
      }),
    }),
  // UpdatePassword
  updatePassword: builder.mutation({
      query: (newPassword) => ({
        url: `/auth/updatepassword`,
        method: 'POST',
        body: { newPassword }, // Correctly wrapping in an object
      }),
    }),
    // UpdateFullName
    updateFullName: builder.mutation({
      query: (fullname) => ({
        url: `/auth/updatefullname`,
        method: 'POST',
        body: { fullname },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
  // Define the middleware to handle the response and set cookies

});

export const { useSignUpMutation, useSignInMutation, useUpdatePasswordMutation,useUpdateFullNameMutation, useLogoutMutation } = authApi;
