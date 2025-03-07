import { baseApi } from "../base";
import { endpointClassroom } from "@/helpers/enpoints";

export const instructorAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getListClassByInstructor: build.query({
      query: (instructorId) =>
        `${endpointClassroom.GET_CLASSES_BY_INSTRUCTOR}?instructorId=${instructorId}`,
    }),
    getClassroomWithTopicsById: build.query({
      query: (classroomId) =>
        endpointClassroom.GET_CLASSROOM_WITH_TOPICS_BY_ID.replace(
          "{id}",
          classroomId,
        ),
    }),
    getClassroomWithStudentsPerformanceById: build.query({
      query: (classroomId) =>
        endpointClassroom.GET_CLASSROOM_WITH_STUDENTS_PERFORMANCE_BY_ID.replace(
          "{id}",
          classroomId,
        ),
    }),
    getStudentProgress: build.query({
      query: (classroomId) =>
        endpointClassroom.GET_CLASSROOM_STUDENTS_PROGRESS_FOR_INSTRUCTOR.replace(
          "{id}",
          classroomId,
        ),
    }),
    getStudentSubmissions: build.query({
      query: ({ classroomId, studentId }) =>
        endpointClassroom.GET_CLASROOM_STUDENT_SUBMISSIONS_FOR_INSTRUCTOR.replace(
          "{classroomId}",
          classroomId,
        ).replace("{studentId}", studentId),
    }),
  }),
});

export const {
  useGetListClassByInstructorQuery,
  useGetClassroomWithTopicsByIdQuery,
  useGetClassroomWithStudentsPerformanceByIdQuery,
  useGetStudentProgressQuery,
  useGetStudentSubmissionsQuery,
} = instructorAPI;
