import { authApi } from "../apiSlice";


export const postsApi = authApi.injectEndpoints({
  tagTypes: ['AllOpps'],
  endpoints: (builder) => ({
    getAllOpportunities: builder.query({
      query: ({ page = 1, limit = 6 }) => `/applicants/getAllOpp`, // Temporarily created
      providesTags: ['AllOpps'],
      transformResponse: (response) => {
        return {
          opportunities: response.opportunities,
          hasMore: response.currentPage < response.totalPages // Handle pagination
        };
      },
    }),
    getPostsByUser: builder.query({
      query: ({ page = 1, limit = 6, userId }) => `/post/allpostbyuser?page=${page}&limit=${limit}&userId=${userId}`,
      providesTags: ['Posts'],
      transformResponse: (response) => {
        return {
          posts: response.posts,
          hasMore: response.currentPage < response.totalPages // Handle pagination
        };
      },
    }),
    
 
    // Posting to addpost API
    addPosts: builder.mutation({
      query: (postBody) => ({
        url: `/post/addpost`,
        method: 'POST',
        body: postBody,
      }),
      invalidatesTags: ['Posts'],
    }),
    // Delete Post
    deletePosts: builder.mutation({
      query: (postId) => ({
        url: `/post/delete/${postId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Posts'],
    }),
    // Get Single Post
    getSinglePost: builder.query({
      query: (postId) => `/post/${postId}`,
    }),
    // COMMENT: All Comment of a Post
    getCommentAllPost: builder.query({
      query: (postId) => `/comment/all/${postId}`,
      providesTags: ['Comments'],
    }),
    // Add Comment to Post
    addCommentToPost: builder.mutation({
      query: ({ postId, commentText }) => ({
        url: `/comment/add/${postId}`,
        method: 'POST',
        body: commentText,
      }),
      invalidatesTags: ['Comments'],
    }),
    // COMMENT: Delete Comment
    deleteCommentOfPost: builder.mutation({
      query: ({ commentId, commentText }) => ({
        url: `/comment/delete/${commentId}`,
        method: 'POST',
        body: commentText,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});
 

export const { 
  useGetAllOpportunitiesQuery,
//   useAddPostsMutation,
} = postsApi;

// for a reference or recall redux: 'use' + '[Name-of-endpoint]' + 'Query' or 'Mutation'