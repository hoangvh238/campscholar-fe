"use client";
import { baseApi } from "../base";

import { endpointCategory } from "@/helpers/enpoints";

export const categoryAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query({
      query: () => ({
        url: endpointCategory.GET_ALL_CATEGORY,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoryQuery } = categoryAPI;
