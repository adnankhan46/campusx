import { authApi } from "../apiSlice";

export const opportunities_api = authApi.injectEndpoints({
  tagTypes: ['AllOpps', 'SingleOpp', 'MyApplications'],
  endpoints: (builder) => ({

    // ─── Get All Opportunities ───────────────────────────────────────────────
    getAllOpportunities: builder.query({
      query: ({ page = 1, limit = 6 }) => `/opportunities/getAllOpp?page=${page}&limit=${limit}`,
      providesTags: ['AllOpps'],
      transformResponse: (response) => ({
        opportunities: response.data.opportunities,
        hasMore: response.data.currentPage < response.data.totalPages,
      }),
    }),

    // ─── Get Single Opportunity by ID ────────────────────────────────────────
    getOpportunityById: builder.query({
      query: (id) => `/opportunities/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'SingleOpp', id }],
    }),

    // ─── Apply for an Opportunity ────────────────────────────────────────────
    applyForOpportunity: builder.mutation({
      query: ({ id, body }) => ({
        url: `/applicants/opportunities/${id}/apply`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'SingleOpp', id },
        'MyApplications',
      ],
    }),

    // ─── Get My Applied Opportunities (to check if already applied) ──────────
    getMyApplication: builder.query({
      query: ({ userId }) => `/applicants/applied-opp/${userId}`,
      providesTags: ['MyApplications'],
      transformResponse: (response) => {
        // Backend returns array directly or wrapped in data property
        return Array.isArray(response) ? response : response.data || [];
      },
      // If 404, just return empty array — user hasn't applied yet
      transformErrorResponse: (response) => {
        if (response.status === 404) return [];
        return response;
      },
    }),

  }),
});

export const {
  useGetAllOpportunitiesQuery,
  useGetOpportunityByIdQuery,
  useApplyForOpportunityMutation,
  useGetMyApplicationQuery,
} = opportunities_api;

// for a reference or recall redux: 'use' + '[Name-of-endpoint]' + 'Query' or 'Mutation'