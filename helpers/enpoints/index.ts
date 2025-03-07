import { constants } from "@/settings";

const prefixAuth: string = "/core";
const prefixBase: string = "/api";
const prefixOther: string = "/api/core";
const prefixApiAuth: string = `/api/core`;

const prefixUser: string = "/api";
const endpointAuth = {
  SIGN_IN: `${prefixUser}/Identity/login`,
  VERIFY_TOKEN: `token/verify/`,
  SIGN_UP: `${prefixUser}/Identity/register`,
  EMAIL: `${prefixUser}/Identity/verify-mail`,
  LOGIN_GOOGLE: `${prefixUser}/Identity/login-google`,
  GENERATE_RESET_PASSOWRD_TOKEN: `${prefixUser}/Identity/generate-reset-password-token`,
  RESET_PASSWORD: `${prefixUser}/Identity/reset-password`,
};

const endpointUsersManagement = {
  GET_ALL_USERS: `${prefixBase}/user-managements/`,
  GET_USER_PROFILE: `${prefixBase}/Profile/`,
  UPDATE_USER_PROFILE: `${prefixBase}/Profile/update-profile`,
};

const endpointProblem = {
  GET_ALL_PROBLEMS: `${prefixBase}/problems`,
  GET_PROBLEM_BY_ID: `${prefixBase}/problems/{id}`,
  CREATE_OR_UPDATE_PROBLEM: `${prefixBase}/problems`,
  DELETE_PROBLEM: `${prefixBase}/problems/{id}`,
};

const endpointTopic = {
  GET_ALL_TOPICS: `${prefixBase}/topics`,
  GET_TOPIC_BY_ID: `${prefixBase}/topics/{id}`,
  CREATE_OR_UPDATE_TOPIC: `${prefixBase}/topics`,
  DELETE_TOPIC: `${prefixBase}/topics/{id}`,
};
export const endpointGrading = {
  SUBMIT_CODE: `${prefixBase}/submissions/submit`,
  RUN_CODE: `${prefixBase}/submissions/run`,
  GET_SUBMISSION_HISTORIES: "/api/submissions/histories",
  GET_SUBMISSION_BY_ID: "/api/submissions/histories/{id}",
};

const endpointCart = {
  GET_CART: `${prefixUser}/Cart/`,
  GET_CURRENT_CART: `${prefixUser}/Cart/{id}`,
  ADD_NEW_CART: `${prefixUser}/Cart/{id}`,
  DELETE_CART: `${prefixUser}/Cart/delete/{id}`,
  ADD_CART: `${prefixUser}/Cart/add-to-cart`,
};

const endpointProduct = {
  GET_ALL_PRODUCT: `${prefixUser}/TemplateCanvas/get-basic`,
  GET_PRODUCT: `${prefixUser}/TemplateCanvas/{id}`,
  GET_SUBPRODUCT: `${prefixUser}/CustomCanvas/{id}`,
  ADD_NEW_PRODUCT: `${prefixUser}/TemplateCanvas`,
  ADD_NEW_SUBPRODUCT: `${prefixUser}/CustomCanvas`,
  GET_ALL_SUBPRODUCT: `${constants.API_SERVER}${prefixUser}/TemplateCanvas/products/{id}`,
  GET_CUSTOM_PRODUCT: `${constants.API_SERVER}${prefixUser}/CustomCanvas/{id}`,
  DELETE_PRODUCT: `${prefixUser}/TemplateCanvas/delete/{id}`,
  DELETE_SUBPRODUCT: `${prefixUser}/CustomCanvas/delete/{id}`,
  FILLTER_PRODUCT: `${prefixUser}/TemplateCanvas/get-all-fillter`,
  SEFT_EDIT: `${prefixUser}/CustomCanvas/selft-edit/{id}`,
  SEARCH_PRODUCT: `${process.env.NEXT_PUBLIC_SEARCH_PRODUCT}/style-up/_search`,
};

const endpointCategory = {
  GET_ALL_CATEGORY: `${prefixUser}/categories`,
};

const endpointTestcase = {
  CREATEORUPDATE_TESTCASE: `${prefixUser}/testcases`,
  GET_TESTCASE_BY_PROBLEMID: `${prefixUser}/testcases/public-by-problem`,
  DELETE_TESTCASE_BY_ID: `${prefixUser}/testcases/{id}`,
};

const endpointScheduleManagement = {};

const endpointContest = {
  GET_ALL_CONTESTS: `${prefixBase}/contests`,
  GET_CONTEST_BY_ID: `${prefixBase}/contests/{id}`,
  CREATE_OR_UPDATE_CONTEST: `${prefixBase}/contests`,
  DELETE_CONTEST: `${prefixBase}/contests/{id}`,
};

const endpointClassroom = {
  CREATE_OR_UPDATE_CLASSROOM: `${prefixBase}/classrooms`,
  GET_CLASSROOM_BY_ID: `${prefixBase}/classrooms/{id}`,
  GET_ALL_CLASSROOMS: `${prefixBase}/classrooms`,
  GET_ALL_CLASSROOM_STUDENTS: `${prefixBase}/classrooms/student-in-class/{id}`,
  DELETE_CLASSROOM_STUDENT: `${prefixBase}/classrooms/{id}/students/{studentId}`,
  GET_CLASSES: `${prefixBase}/classrooms/preview-list-by-student`,
  GET_CLASSES_BY_INSTRUCTOR: `${prefixBase}/classrooms/preview-list-by-instructor`,
  IMPORT_STUDENT_BY_EXCEL: `${prefixBase}/classrooms/{id}/import-students`,
  GET_CLASSROOM_WITH_TOPICS_BY_ID: `${prefixBase}/classrooms/with-topics/{id}`,
  GET_CLASSROOM_WITH_STUDENTS_PERFORMANCE_BY_ID: `${prefixBase}/classrooms/with-students-performance/{id}`,
  GET_CLASSROOM_STUDENTS_PROGRESS_FOR_INSTRUCTOR: `${prefixBase}/classrooms/{id}/topic-progress`,
  GET_CLASROOM_STUDENT_SUBMISSIONS_FOR_INSTRUCTOR: `${prefixBase}/classrooms/{classroomId}/student-progress/{studentId}`,
  GET_TOPICS: `${prefixBase}/classrooms/topic-list-by-student`,
  GET_LEADERBOARD: `${prefixBase}/classrooms/leaderboard`,
};

const endpointAdmin = {
  REGISTER_AUTO_EXCEL: `${prefixBase}/identity/register-auto-excel`,
};
export {
  endpointTopic,
  endpointAuth,
  endpointUsersManagement,
  endpointScheduleManagement,
  endpointContest,
  endpointAdmin,
  endpointProblem,
  endpointCategory,
  endpointTestcase,
  endpointClassroom,
};
