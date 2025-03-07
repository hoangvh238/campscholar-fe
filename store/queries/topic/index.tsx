"use client";

import { baseApi } from "../base";

import { endpointTopic } from "@/helpers/enpoints";

export const topicAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopicById: build.query({
      query: (id: string) => endpointTopic.GET_TOPIC_BY_ID.replace("{id}", id),
    }),

    getAllTopics: build.query({
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
        return `${endpointTopic.GET_ALL_TOPICS}?${queryParams}`;
      },
    }),

    deleteTopicById: build.mutation({
      query: (id: string) => ({
        url: endpointTopic.DELETE_TOPIC.replace("{id}", id),
        method: "DELETE",
      }),
    }),

    updateTopic: build.mutation({
      query: (topicData) => ({
        url: endpointTopic.CREATE_OR_UPDATE_TOPIC,
        method: "PUT",
        body: topicData,
      }),
    }),
  }),
});

export const {
  useGetTopicByIdQuery,
  useGetAllTopicsQuery,
  useDeleteTopicByIdMutation,
  useUpdateTopicMutation,
} = topicAPI;
