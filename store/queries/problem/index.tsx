"use client";

import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { baseApi } from "../base";

import { endpointProblem } from "@/helpers/enpoints";

export interface Problem {
  id: string
  name: string
  difficultyLevel: string
  problemFileName: string
  point: number
  contestName: string | null
  codeTemplate: string | null
  categories: { name: string; id: string }[]
  updatedDate: string
  resolvedStatus: string
}

export interface ProblemResponse {
  result: {
    items: Problem[]
    total: number
    skiped: number
    pageSize: number
    metaData: any
  }
  success: boolean
  message: string
  errorCode: null | string
  errorDetails: null | string
}

export interface ProblemQueryParams {
  pageSize: number
  pageIndex: number
  globalFilter: string
  sorting: SortingState
  filters: ColumnFiltersState
}
export interface ProblemAnalysis {
  myProblems: number;
  totalProblems: number;
  mostAttemptedCount: number;
  mostAttemptedProblem: string;
  activeStudents: number;
  activeStudentsGrowth: number;
  popularCategory: {
    name: string;
    id: string;
  };
  popularCategoryAttempt: number;
}

export interface ProblemDifficulty {
  easyPercentage: {
    percentage: number;
    numberOfItems: number;
  };
  mediumPercentage: {
    percentage: number;
    numberOfItems: number;
  };
  hardPercentage: {
    percentage: number;
    numberOfItems: number;
  };
}

export interface ProblemTrend {
  date: string;
  day: string;
  attempts: number;
}


export const problemAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProblemById: build.query({
      query: (id: string) =>
        endpointProblem.GET_PROBLEM_BY_ID.replace("{id}", id),
    }),
    getAllProblems: build.query<ProblemResponse, ProblemQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams()

        queryParams.append("pageSize", params.pageSize.toString())
        queryParams.append("pageIndex", (params.pageIndex+1).toString())
        if (params.globalFilter) queryParams.append("globalFilter", params.globalFilter)

        if (params.sorting.length > 0) {
          queryParams.append("sortField", params.sorting[0].id)
          queryParams.append("Asc", params.sorting[0].desc ? "false" : "true")
        }

        params.filters.forEach((filter: any) => {
          if (filter.id === "resolvedStatus") {
            if (Array.isArray(filter.value)) {
              filter.value.forEach((val: string) => {
                queryParams.append(`Filter.Status`, val);
              });
            } else {
              queryParams.append(`Filter.Status`, filter?.value);
            }
          } else {
            if (Array.isArray(filter.value)) {
              filter.value.forEach((val: string) => {
                queryParams.append(`Filter.${filter.id}`, val);
              });
            } else {
              queryParams.append(`Filter.${filter.id}`, filter?.value);
            }
          }
        });
        
        

        return {
          url: `api/problems?${queryParams.toString()}`,
        }
      },
    }),

    deleteProblemById: build.mutation({
      query: (id: string) => ({
        url: endpointProblem.DELETE_PROBLEM.replace("{id}", id),
        method: "DELETE",
      }),
    }),

    updateProblem: build.mutation({
      query: (problemData) => ({
        url: endpointProblem.CREATE_OR_UPDATE_PROBLEM,
        method: "PUT",
        body: problemData,
      }),
    }),
    getProblemAnalysis: build.query<{ result: ProblemAnalysis }, void>({
      query: () => ({
        url: 'api/problems/problem-analysic',
        method: 'GET',
      }),
    }),
    getProblemDifficultyAnalysis: build.query<{ result: ProblemDifficulty }, void>({
      query: () => ({
        url: 'api/problems/problem-difficult-analysic',
        method: 'GET',
      }),
    }),
    getProblemTrendAnalysis: build.query<{ result: ProblemTrend[] }, void>({
      query: () => ({
        url: 'api/problems/problem-trend-analysic',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetProblemByIdQuery,
  useGetAllProblemsQuery,
  useDeleteProblemByIdMutation,
  useUpdateProblemMutation,
  useGetProblemAnalysisQuery,
  useGetProblemDifficultyAnalysisQuery,
  useGetProblemTrendAnalysisQuery,
} = problemAPI;
