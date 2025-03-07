"use client";
import { baseApi } from "../base";

import { endpointTestcase } from "@/helpers/enpoints";

export const testcaseAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createorupdateTestcase: build.mutation({
      query: (testcaseData) => ({
        url: endpointTestcase.CREATEORUPDATE_TESTCASE,
        method: "PUT",
        body: testcaseData,
      }),
    }),
    gettestcasebyproblemid: build.query({
      query: (problemId) => ({
        url: endpointTestcase.GET_TESTCASE_BY_PROBLEMID,
        method: "GET",
        params: { problemId },
      }),
    }),
    deletetestcasebyid: build.mutation({
      query: (id: string) => ({
        url: endpointTestcase.DELETE_TESTCASE_BY_ID.replace("{id}", id),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateorupdateTestcaseMutation,
  useGettestcasebyproblemidQuery,
  useDeletetestcasebyidMutation,
} = testcaseAPI;
