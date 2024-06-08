import { authApi } from "../apiSlice";

export const postsApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
      getPosts: builder.query({
        query: () => '/post/allpost',
      }),
    }),
  });
  
  export const { useGetPostsQuery } = postsApi;