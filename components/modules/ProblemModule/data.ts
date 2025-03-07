// Dummy data

import { supportCodeLanguage } from "@/types/code-language-supporting";
import {
  Category,
  Language,
  Problem,
  SubmissionMock,
  User,
} from "@/types/submitsion";

export const dummyProblem: Problem = {
  id: "59de1e40-cc4f-44ab-8337-0492b8bc43a8",
  prompt: "Write a program that adds two numbers.",
  title: "Add Two Numbers",
  timeout: 2000,
  difficultyLevel: "EASY",
  user_id: "user-123",
  upload_date: "2024-01-01",
  test_cases: [
    {
      id: "a",
      problem_id: "59de1e40-cc4f-44ab-8337-0492b8bc43a8",
      input: "1\n2",
      is_public: true,
      expected_output: "1 2",
      user_output: "", // ✅ Default empty string
      test_case: "Test 1", // ✅ Provide a default test case name
      passed: false, // ✅ Default to false or some logical initial value
    },
    {
      id: "ab",
      problem_id: "59de1e40-cc4f-44ab-8337-0492b8bc43a8",
      input: "4 20",
      is_public: false,
      expected_output: "30",
      user_output: "",
      test_case: "Test 2",
      passed: false,
    },
  ],
  categories: [
    {
      id: "cat-1",
      name: "Mathematics",
    },
  ],
};

export const dummyUser: User = {
  id: "user-123",
  account_identifier: "user123",
  name: "John Doe",
  email: "johndoe@example.com",
  emailVerified: "2024-01-01",
  image: "https://example.com/avatar.png",
  join_date: "2023-12-01",
  is_admin: false,
};

export const dummyLanguage: Language = {
  id: "lang-1",
  name: "Python",
  extension: ".py",
  version: "3.9",
};

export const dummySubmission: SubmissionMock = {
  id: "sub-1",
  user_id: "user-123",
  problem_id: 1,
  problem: dummyProblem,
  time_elapsed: 150,
  language_id: "lang-1",
  language: dummyLanguage,
  status: "ACCEPTED",
  failed_test_case_id: undefined,
  submit_time: "2024-01-02T12:00:00Z",
  source_code: "print(sum(map(int, input().split())))",
  stdout: "3",
  stderr: "",
};

export const dummySubmissions: SubmissionMock[] = [
  {
    id: "sub-1",
    user_id: "user-123",
    problem_id: 1,
    problem: dummyProblem,
    time_elapsed: 150,
    language_id: "lang-1",
    language: dummyLanguage,
    status: "ACCEPTED",
    failed_test_case_id: undefined,
    submit_time: "2024-01-02T12:00:00Z",
    source_code: "print(sum(map(int, input().split())))",
    stdout: "3",
    stderr: "",
  },
  {
    id: "sub-2",
    user_id: "user-123",
    problem_id: 1,
    problem: dummyProblem,
    time_elapsed: 300,
    language_id: "lang-2",
    language: supportCodeLanguage[1],
    status: "WRONG_ANSWER",
    failed_test_case_id: "tc-2",
    submit_time: "2024-01-02T12:05:00Z",
    source_code:
      "#include <iostream>\nusing namespace std;\nint main() { int a, b; cin >> a >> b; cout << a - b; return 0; }",
    stdout: "-10",
    stderr: "",
  },
];

export const dummyCategories: Category[] = [
  {
    id: "cat-1",
    name: "Mathematics",
  },
  {
    id: "cat-2",
    name: "Algorithms",
  },
];
