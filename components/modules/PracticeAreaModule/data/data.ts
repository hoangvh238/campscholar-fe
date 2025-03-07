import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

import { SubmissionMock } from "@/types/submitsion";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const problemsTwo: any[] = [
  {
    id: 1,
    title: "Two Sum",
    prompt: "Find the indicies of two numbers that add to sum.",
    timeout: 1000,
    user_id: 1,
    upload_date: new Date(),
    author: "LeetCode",
  },
];

// generate aan array with 5 random dates within the past [one hour, one day, one week, one month, one year]
const getDate = () => {
  let date = new Date();
  let random = Math.floor(Math.random() * 5);
  let time = 0;
  switch (random) {
    case 0:
      time = Math.floor(Math.random() * 3600);
      break;
    case 1:
      time = Math.floor(Math.random() * 86400);
      break;
    case 2:
      time = Math.floor(Math.random() * 604800);
      break;
    case 3:
      time = Math.floor(Math.random() * 2629743);
      break;
    case 4:
      time = Math.floor(Math.random() * 31556926);
      break;
  }
  date.setSeconds(date.getSeconds() - time);
  return date;
};
// Dummy data
export const recentSubmissions: SubmissionMock[] = [
  {
    id: "submission-1",
    problem: problemsTwo[0],
    language: { name: "javascript" } as any,
    status: "ACCEPTED",

    source_code: "1",
    stdout: "",
    stderr: "",
    submit_time: getDate().toLocaleTimeString(),
    language_id: "1",
    problem_id: 1,
    time_elapsed: 1,
    user_id: "1",
  },
  {
    id: "submission-2",
    problem: problemsTwo[0],
    language: { name: "Python" } as any,
    status: "MEMORY_LIMIT_EXCEEDED",

    source_code: "1",
    stdout: "",
    stderr: "",
    submit_time: getDate().toLocaleTimeString(),
    language_id: "1",
    problem_id: 1,
    time_elapsed: 1,
    user_id: "1",
  },
  {
    id: "submission-3",
    problem: problemsTwo[0],
    language: { name: "C++" } as any,
    status: "PENDING",

    source_code: "1",
    stdout: "",
    stderr: "",
    submit_time: getDate().toLocaleTimeString(),
    language_id: "1",
    problem_id: 1,
    time_elapsed: 1,
    user_id: "1",
  },
  {
    id: "submission-4",
    problem: problemsTwo[0],
    language: { name: "Java" } as any,
    status: "ACCEPTED",

    source_code: "1",
    stdout: "",
    stderr: "",
    submit_time: getDate().toLocaleTimeString(),
    language_id: "1",
    problem_id: 1,
    time_elapsed: 1,
    user_id: "1",
  },
  {
    id: "submission-5",
    problem: problemsTwo[0],
    language: { name: "C" } as any,
    status: "COMPILE_TIME_ERROR",

    source_code: "1",
    stdout: "",
    stderr: "",
    submit_time: getDate().toLocaleTimeString(),
    language_id: "1",
    problem_id: 1,
    time_elapsed: 1,
    user_id: "1",
  },
];

const problemsDummy = [
  {
    id: 1,
    prompt: "Find the sum of two integers.",
    title: "Sum of Two Numbers",
    timeout: 2,
    difficulty: "VERY EASY",
    user_id: "user_123",
    upload_date: "2024-12-01T12:00:00.000Z",
    test_cases: [
      {
        id: "test_001",
        problem_id: 1,
        input: "1, 2",
        is_public: true,
        expected_output: "3",
      },
    ],
    categories: [{ id: "cat_1", name: "Math" }],
  },
  {
    id: 2,
    prompt: "Determine if a number is prime.",
    title: "Prime Number Checker",
    timeout: 3,
    difficulty: "EASY",
    user_id: "user_456",
    upload_date: "2024-12-02T14:00:00.000Z",
    test_cases: [
      {
        id: "test_002",
        problem_id: 2,
        input: "7",
        is_public: true,
        expected_output: "true",
      },
    ],
    categories: [{ id: "cat_2", name: "Algorithms" }],
  },
  {
    id: 3,
    prompt: "Sort an array of integers in ascending order.",
    title: "Array Sorter",
    timeout: 4,
    difficulty: "MEDIUM",
    user_id: "user_789",
    upload_date: "2024-12-03T16:00:00.000Z",
    test_cases: [
      {
        id: "test_003",
        problem_id: 3,
        input: "[3, 1, 2]",
        is_public: true,
        expected_output: "[1, 2, 3]",
      },
    ],
    categories: [{ id: "cat_3", name: "Data Structures" }],
  },
  {
    id: 4,
    prompt: "Find the factorial of a number.",
    title: "Factorial Finder",
    timeout: 3,
    difficulty: "EASY",
    user_id: "user_101",
    upload_date: "2024-12-04T10:00:00.000Z",
    test_cases: [
      {
        id: "test_004",
        problem_id: 4,
        input: "5",
        is_public: true,
        expected_output: "120",
      },
    ],
    categories: [{ id: "cat_4", name: "Math" }],
  },
  {
    id: 5,
    prompt: "Find the largest element in an array.",
    title: "Largest Element Finder",
    timeout: 2,
    difficulty: "VERY EASY",
    user_id: "user_111",
    upload_date: "2024-12-05T11:00:00.000Z",
    test_cases: [
      {
        id: "test_005",
        problem_id: 5,
        input: "[10, 20, 5, 30]",
        is_public: true,
        expected_output: "30",
      },
    ],
    categories: [{ id: "cat_5", name: "Data Structures" }],
  },
];
// Example usage:
export default problemsDummy;
