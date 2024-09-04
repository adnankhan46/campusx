import { authApi } from "../apiSlice";
const BASE_URL = "/api";

export const postsApi = authApi.injectEndpoints({
  tagTypes: ['Posts', 'Comments'],
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
       // Delete Post
      deletePosts: builder.mutation ({
        query: (postId) => ({
          url: `/post/delete/${postId}`,
          method: 'POST',
        }),
        invalidatesTags: ['Posts']
      }),
       // Get Single Post
      getSinglePost: builder.query({
        query: (postId) => `/post/${postId}`
      }),
       // COMMENT: All Comment of a Post
      getCommentAllPost: builder.query({
        query: (postId) => `/comment/all/${postId}`,
        providesTags: ['Comments'],
      }),
      // Add Comment to Post
      addCommentToPost: builder.mutation ({
        query: ({postId, commentText}) => ({
          url: `/comment/add/${postId}`,
          method: 'POST',
          body: commentText
        }),
        invalidatesTags: ['Comments']
      }),
      // COMMENT: Delete Comment
      deleteCommentOfPost: builder.mutation ({
        query: ({commentId, commentText}) => ({
          url: `/comment/delete/${commentId}`,
          method: 'POST',
          body: commentText
        }),
        invalidatesTags: ['Comments']
      }),
    }),
  });
  
  export const { useGetPostsQuery,
    useAddPostsMutation,
    useDeletePostsMutation,
    useGetSinglePostQuery,
    useGetCommentAllPostQuery,
    useAddCommentToPostMutation,
    useDeleteCommentOfPostMutation
  } = postsApi;