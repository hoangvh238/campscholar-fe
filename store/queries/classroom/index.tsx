import { endpointClassroom } from "@/helpers/enpoints";
import { baseApi } from "../base";
import { ClassData } from "./dummy";
import {
  ActivityEntry,
  dummyApi,
  LeaderboardEntry,
  ProblemTopic,
  Topic,
} from "./dummy.detailclass";
export interface CustomFetchBaseQueryError {
  status: number;
  data?: unknown;
  error: string;
}

const colorMap: string[] = [
  "blue",
  "green",
  "purple",
  "orange",
  "red",
  "teal",
  "amber",
  "indigo",
  "pink",
  "cyan",
];

const getSemesterAndEndDate = (startDate: string) => {
  const date = new Date(startDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= 1 && month <= 4) {
    return {
      semester: `spring${year}`,
      endDate: `${year}-04-25`,
    };
  } else if (month >= 5 && month <= 8) {
    return {
      semester: `summer${year}`,
      endDate: `${year}-08-23`,
    };
  } else if (month >= 9 && month <= 12) {
    return {
      semester: `fall${year}`,
      endDate: `${year}-12-20`,
    };
  }

  return {
    semester: "unknown",
    endDate: "",
  };
};

const mapBackendClassToFrontend = (
  backendData: any[],
  colorOrder: string[],
): ClassData[] => {
  return backendData.map((item, index) => {
    const { semester, endDate } = getSemesterAndEndDate(item.startDate);
    return {
      id: item.id,
      name: item.name,
      courseCode: item.name.split("_")[0],
      fullName: item.name,
      instructor: item.instructorName,
      semester: semester,
      startDate: item.startDate,
      endDate: endDate,
      assignments: item.totalProblem,
      progress: item.progress,
      color: colorOrder[index % colorOrder.length],
      totalStudent: item.totalStudent,
      numberOfTopic: item.numberOfTopic,
    };
  });
};
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const classroomAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClassroomById: build.query({
      query: (id: string) =>
        endpointClassroom.GET_CLASSROOM_BY_ID.replace("{id}", id),
    }),

    createOrUpdateClassroom: build.mutation({
      query: (classroomData) => ({
        url: endpointClassroom.CREATE_OR_UPDATE_CLASSROOM,
        method: "PUT",
        body: classroomData,
      }),
    }),

    getClasses: build.query<ClassData[], string>({
      query: (id) => `${endpointClassroom.GET_CLASSES}?studentId=${id}`,
      transformResponse: (response: any) => {
        if (response.success && Array.isArray(response.result)) {
          return mapBackendClassToFrontend(response.result, colorMap);
        }
        return [];
      },
    }),

    getClassDetail: build.query<
      ClassData,
      { classId: string; studentId: string }
    >({
      query: ({ studentId }) =>
        `${endpointClassroom.GET_CLASSES}?studentId=${studentId}`,
      transformResponse: (response: any, _meta, { classId }) => {
        if (response.success && Array.isArray(response.result)) {
          const mappedClasses = mapBackendClassToFrontend(
            response.result,
            colorMap,
          );

          const classData = mappedClasses.find((c) => c.id === classId);

          if (!classData) {
            throw new Error(`Class with ID ${classId} not found`);
          }
          return classData;
        }
        throw new Error("Invalid response from server");
      },
    }),

    getTopics: build.query<Topic[], { classId: string; studentId: string }>({
      query: ({ classId, studentId }) =>
        `${endpointClassroom.GET_TOPICS}/${classId}?studentId=${studentId}`,
      transformResponse: (response: any) => {
        if (response.success && Array.isArray(response.result)) {
          return response.result.map((topic: any) => ({
            id: topic.topicId,
            title: topic.topicName,
            totalProblems: topic.totalProblems,
            completedProblems: topic.solvedProblems,
            status:
              topic.progressPercentage === 100
                ? "completed"
                : topic.progressPercentage > 0
                  ? "in-progress"
                  : "not-started",
            difficulty: topic.averageDifficulty,
            problems: topic.problems.map((problem: any) => ({
              problemId: problem.problemId,
              problemName: problem.problemName,
              difficulty: problem.difficulty,
              isSolved: problem.isSolved,
            })),
          }));
        }
        return [];
      },
    }),

    getProblems: build.query<ProblemTopic[], { classId: string }>({
      queryFn: async ({ classId }) => {
        try {
          const data = await dummyApi.getProblems(classId, "");
          return { data };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error,
              error: "Failed to fetch problems",
            } as CustomFetchBaseQueryError,
          };
        }
      },
    }),

    getLeaderboard: build.query<LeaderboardEntry[], string>({
      query: (classId) => `${endpointClassroom.GET_LEADERBOARD}/${classId}`,
      transformResponse: (response: any) => {
        if (response.success && Array.isArray(response.result)) {
          return response.result.map((entry: any) => ({
            id: entry.studentId,
            name: entry.studentName,
            avatar: `/placeholder.svg?height=40&width=40`,
            solvedProblems: parseInt(entry.problemsSolved.split("/")[0], 10),
            score: entry.score,
            rank: entry.rank,
          }));
        }
        return [];
      },
    }),

    getActivity: build.query<ActivityEntry[], string>({
      queryFn: async (classId) => {
        try {
          const data = await dummyApi.getActivity(classId);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error,
              error: "Failed to fetch activity",
            } as CustomFetchBaseQueryError,
          };
        }
      },
    }),
    getStudents: build.query({
      query: (classroomId: string) =>
        endpointClassroom.GET_ALL_CLASSROOM_STUDENTS.replace(
          "{id}",
          classroomId,
        ),
    }),
    removeStudent: build.mutation({
      query: ({ classroomId, studentId }) => ({
        url: endpointClassroom.DELETE_CLASSROOM_STUDENT.replace(
          "{id}",
          classroomId,
        ).replace("{memberId}", studentId),
        method: "DELETE",
      }),
    }),
  }),
});

export const updateClassroomAPI = createApi({
  reducerPath: "classroomAPI",
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
    importStudents: builder.mutation<
      { message: string },
      { classroomId: string; formData: FormData }
    >({
      query: ({ classroomId, formData }) => ({
        url: `/classrooms/import-students/${classroomId}`,
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassroomByIdQuery,
  useCreateOrUpdateClassroomMutation,
  useGetClassDetailQuery,
  useGetTopicsQuery,
  useGetProblemsQuery,
  useGetLeaderboardQuery,
  useGetActivityQuery,
  useGetStudentsQuery,
  useRemoveStudentMutation,
} = classroomAPI;

export const { useImportStudentsMutation } = updateClassroomAPI;
