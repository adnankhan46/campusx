import { authApi } from "../apiSlice";
const BASE_URL = "/api";

export const postsApi = authApi.injectEndpoints({
  tagTypes: ['Posts'],
    endpoints: (builder) => ({
      // Get All Post
      getPosts: builder.query({
        query: () => `/post/allpost`,
        providesTags: ['Posts'],
        transformResponse: (post) => post.reverse(),
      }),
      // Posting to addpost API
      addPosts: builder.mutation ({
        query: (postBody) => ({
          url: `/post/addpost`,
          method: 'POST',
          body: postBody,
        }),
        invalidatesTags: ['Posts']
      }),
      getSinglePost: builder.query({
        query: (postId) => `/post/${postId}`
      }),
    }),
  });
  
  export const { useGetPostsQuery, useAddPostsMutation, useGetSinglePostQuery} = postsApi;