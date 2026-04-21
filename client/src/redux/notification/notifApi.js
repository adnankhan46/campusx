import { authApi } from "../apiSlice";

export const notifApi = authApi.injectEndpoints({
  tagTypes: ['Notification', 'Comments'],
  endpoints: (builder) => ({
    // Fetch notifications for the current user
    fetchNotifications: builder.query({
        query: (userId) => `/notification/allnotif/${userId}`,
      }),
  
      // Clear all notifications for the current user
      clearNotifications: builder.mutation({
        query: (userId) => ({
          url: `/notification/deletenotif/${userId}`,
          method: 'POST',
        }),
      }), 
  }),
});
 

export const { 
    useFetchNotificationsQuery,
    useClearNotificationsMutation,
} = notifApi;
