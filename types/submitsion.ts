export interface User {
  id: string;
  account_identifier: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  join_date: string;
  is_admin: boolean;
}

export interface Language {
  id: string;
  name: string;
  extension: string;
  version: string;
}

export interface Problem {
  id: string;
  prompt: string;
  title: string;
  timeout: number;
  difficultyLevel: string;
  user_id: string;
  upload_date: string;
  test_cases: TestCase[];
  categories: Category[];
}

export interface TestCase {
  id: string;
  problem_id: string;
  input: string;
  is_public: boolean;
  user_output: string;
  test_case: string;
  passed: boolean;
  expected_output: string;
}

export interface Category {
  id: string;
  name: string;
}

export enum status {
  ACCEPTED = "Accepted",
  WRONG_ANSWER = "Wrong Answer",
  TIME_LIMIT_EXCEEDED = "Time Limit Exceeded",
  MEMORY_LIMIT_EXCEEDED = "Memory Limit Exceeded",
  RUNTIME_ERROR = "Runtime Error",
  COMPILE_TIME_ERROR = "Compile Time Error",
  PENDING = "Pending",
}

export const statusMap: Record<string, string> = {
  ACCEPTED: status.ACCEPTED,
  WRONG_ANSWER: status.WRONG_ANSWER,
  TIME_LIMIT_EXCEEDED: status.TIME_LIMIT_EXCEEDED,
  MEMORY_LIMIT_EXCEEDED: status.MEMORY_LIMIT_EXCEEDED,
  RUNTIME_ERROR: status.RUNTIME_ERROR,
  COMPILE_TIME_ERROR: status.COMPILE_TIME_ERROR,
  PENDING: status.PENDING,
};

export type SubmissionStatus =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "COMPILE_TIME_ERROR"
  | "PENDING";

export interface SubmissionHistory {
  id: string;
  userId: string;
  problemId: string;
  submissionCode: string;
  language: number;
  totalPassedTestCases: number;
  totalTestCases: number;
  runtime: number;
  status?: SubmissionStatus;
  errorMessage?: string;
  updatedDate: Date;
}

export interface SubmissionResult {
  id: string;
  submissionId: string;
  gradedById: string | null;
  gradingMethod: number;
  runtime: number;
  score: number;
  feedback: string | null;
  totalPassedTestCases: number;
  totalTestCases: number;
  submissionCount: number;
  gradingResultList: GradingResult[];
  totalMemoryUsageInMB: number;
}

export interface GradingResult {
  testCaseId: string;
  isPassed: boolean;
  userOutput: string;
}

export interface SubmissionMock {
  id: string;
  user_id: string;
  problem_id: number;
  problem: Problem;
  time_elapsed: number;
  language_id: string;
  language: Language;
  status: SubmissionStatus;
  failed_test_case_id?: string;
  submit_time: string;
  source_code: string;
  stdout: string;
  stderr: string;
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  submissionCode: string;
  submissionCount: number;
  language: number;
  grading: Grading;
  status?: SubmissionStatus;
}

export interface Grading {
  submissionId: string;
  gradedById: string | null;
  gradingMethod: number;
  runtime: number;
  score: number;
  isPassed: boolean;
  feedback: string | null;
  id: string;
}

// export interface Competition {
//     id: number;
//     userId: number;
//     startTime: Date;
//     endTime: Date;
//     description: string;
//     title: string;
//     problems: Problem[];
//     participants: User[];
// }
