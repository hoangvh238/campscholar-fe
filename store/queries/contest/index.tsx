"use client";

import { baseApi } from "../base";
import { endpointContest } from "@/helpers/enpoints";

export const contestAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContestById: build.query({
      query: (id: string) =>
        endpointContest.GET_CONTEST_BY_ID.replace("{id}", id),
    }),
    getAllContests: build.query({
      query: ({
        pageSize = 10,
        pageIndex = 0,
        filter = "",
        sortField = "",
        asc = true,
      }) => {
        const queryParams = new URLSearchParams({
          PageSize: pageSize.toString(),
          PageIndex: pageIndex.toString(),
          Filter: filter,
          SortField: sortField,
          Asc: asc.toString(),
        }).toString();
        return `${endpointContest.GET_ALL_CONTESTS}?${queryParams}`;
      },
    }),

    deleteContestById: build.mutation({
      query: (id: string) => ({
        url: endpointContest.DELETE_CONTEST.replace("{id}", id),
        method: "DELETE",
      }),
    }),

    createOrUpdateContest: build.mutation({
      query: (contestData) => ({
        url: endpointContest.CREATE_OR_UPDATE_CONTEST,
        method: "PUT",
        body: contestData,
      }),
    }),
  }),
});

export const {
  useGetContestByIdQuery,
  useGetAllContestsQuery,
  useDeleteContestByIdMutation,
  useCreateOrUpdateContestMutation,
} = contestAPI;
