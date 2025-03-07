"use client";

import { baseApi } from "../base";

import { Submission } from "@/types/submitsion";
import { endpointGrading } from "@/helpers/enpoints";

export const gradingAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    evaluateCode: build.mutation({
      query: (submission) => ({
        url: endpointGrading.SUBMIT_CODE,
        method: "POST",
        body: {
          userId: submission.userId,
          name: submission.name,
          problemId: submission.problemId,
          submissionCode: submission.submissionCode,
          language: submission.language,
        },
      }),
    }),

    runCode: build.mutation({
      query: ({ submissionCode, language, problemId }) => ({
        url: endpointGrading.RUN_CODE,
        method: "POST",
        body: { submissionCode, language, problemId },
      }),
    }),

    getSubmissionHistories: build.query<
      any,
      { userId: string; problemId: string }
    >({
      query: ({ userId, problemId }) => ({
        url: endpointGrading.GET_SUBMISSION_HISTORIES,
        method: "GET",
        params: { userId, problemId },
      }),
      transformResponse: (response: any) => response.result,
    }),

    getSubmissionById: build.query({
      query: ({ id }) => ({
        url: endpointGrading.GET_SUBMISSION_BY_ID.replace("{id}", id),
        method: "GET",
      }),
      transformResponse: (response: any) => response.result,
    }),

    getCurrentSubmission: build.query<
      Submission,
      { userId: string; problemId: string }
    >({
      query: ({ userId, problemId }) => ({
        url: `/api/submissions/current`,
        method: "GET",
        params: {
          userId,
          problemId,
        },
      }),
      transformResponse: (response: any) => response.result,
    }),
  }),
});

export const {
  useEvaluateCodeMutation,
  useRunCodeMutation,
  useGetSubmissionHistoriesQuery,
  useGetSubmissionByIdQuery,
  useGetCurrentSubmissionQuery,
} = gradingAPI;
