import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://campscholar-container-app.jollyrock-bfc63077.southeastasia.azurecontainerapps.io/api",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("_access_token");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
    }),

    updateUserProfile: builder.mutation<
      { message: string },
      { userId: string; formData: FormData }
    >({
      query: ({ userId, formData }) => ({
        url: `/profile/update-profile`,
        method: "PUT",
        params: { userId },
        body: formData,
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
  userProfileApi;
