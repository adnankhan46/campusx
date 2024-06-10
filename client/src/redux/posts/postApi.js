import { authApi } from "../apiSlice";
const BASE_URL = "/api";

export const postsApi = authApi.injectEndpoints({
  tagTypes: ['Posts'],
    endpoints: (builder) => ({
      getPosts: builder.query({
        query: () => `${BASE_URL}/post/allpost`,
        providesTags: ['Posts'],
        transformResponse: (post) => post.reverse(),
      }),
      addPosts: builder.mutation ({
        query: (postBody) => ({
          url: `${BASE_URL}/post/addpost`,
          method: 'POST',
          body: postBody,
        }),
        invalidatesTags: ['Posts']
      }),
    }),
  });
  
  export const { useGetPostsQuery, useAddPostsMutation } = postsApi;