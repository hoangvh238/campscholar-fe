// Mock data for the dashboard

export type Class = {
  id: string;
  name: string;
  studentCount: number;
  topicCount: number;
  totalProblems: number;
  averageProgress: number;
};

export type Student = {
  id: string;
  code: string;
  name: string;
  score: number;
  scoreOutOf10: number;
  progress: number;
};

export type Topic = {
  id: string;
  name: string;
};

export type Problem = {
  id: string;
  name: string;
  topicId: string; // Add this line
  maxScore: number;
  scoreEarned: number;
  status: "Accepted" | "Wrong Answer" | "Pending";
  submissionsCount: number;
  lastSubmitted: string;
};

export type Submission = {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  problemId: string;
  problemName: string;
  code: string;
  testCases: {
    name: string;
    status: "Passed" | "Failed";
    expected: string;
    actual: string;
  }[];
  executionTime: string;
  feedback: string;
  score: number;
};

// Mock classes
export const classes: Class[] = [
  {
    id: "class-1",
    name: "Introduction to Programming",
    studentCount: 32,
    topicCount: 8,
    totalProblems: 24,
    averageProgress: 78,
  },
  {
    id: "class-2",
    name: "Data Structures",
    studentCount: 28,
    topicCount: 12,
    totalProblems: 36,
    averageProgress: 65,
  },
  {
    id: "class-3",
    name: "Algorithms",
    studentCount: 24,
    topicCount: 10,
    totalProblems: 30,
    averageProgress: 52,
  },
  {
    id: "class-4",
    name: "Web Development",
    studentCount: 36,
    topicCount: 14,
    totalProblems: 42,
    averageProgress: 81,
  },
  {
    id: "class-5",
    name: "Database Systems",
    studentCount: 30,
    topicCount: 9,
    totalProblems: 27,
    averageProgress: 73,
  },
];

// Mock topics
export const topics: Topic[] = [
  { id: "topic-1", name: "Variables and Data Types" },
  { id: "topic-2", name: "Control Structures" },
  { id: "topic-3", name: "Functions" },
  { id: "topic-4", name: "Arrays and Lists" },
  { id: "topic-5", name: "Object-Oriented Programming" },
  { id: "topic-6", name: "Algorithms" },
  { id: "topic-7", name: "Data Structures" },
];

// Mock students
export const students: Student[] = [
  {
    id: "student-1",
    code: "STU001",
    name: "Alice Johnson",
    score: 85,
    scoreOutOf10: 8.5,
    progress: 92,
  },
  {
    id: "student-2",
    code: "STU002",
    name: "Bob Smith",
    score: 72,
    scoreOutOf10: 7.2,
    progress: 78,
  },
  {
    id: "student-3",
    code: "STU003",
    name: "Charlie Brown",
    score: 90,
    scoreOutOf10: 9.0,
    progress: 95,
  },
  {
    id: "student-4",
    code: "STU004",
    name: "Diana Miller",
    score: 68,
    scoreOutOf10: 6.8,
    progress: 65,
  },
  {
    id: "student-5",
    code: "STU005",
    name: "Edward Wilson",
    score: 78,
    scoreOutOf10: 7.8,
    progress: 82,
  },
  {
    id: "student-6",
    code: "STU006",
    name: "Fiona Garcia",
    score: 88,
    scoreOutOf10: 8.8,
    progress: 90,
  },
  {
    id: "student-7",
    code: "STU007",
    name: "George Lee",
    score: 75,
    scoreOutOf10: 7.5,
    progress: 80,
  },
  {
    id: "student-8",
    code: "STU008",
    name: "Hannah Kim",
    score: 92,
    scoreOutOf10: 9.2,
    progress: 95,
  },
  {
    id: "student-9",
    code: "STU009",
    name: "Ian Chen",
    score: 65,
    scoreOutOf10: 6.5,
    progress: 70,
  },
  {
    id: "student-10",
    code: "STU010",
    name: "Julia Patel",
    score: 82,
    scoreOutOf10: 8.2,
    progress: 85,
  },
];

// Mock problems
export const problems: Problem[] = [
  {
    id: "problem-1",
    name: "Hello World Program",
    topicId: "topic-1", // Add this line
    maxScore: 5,
    scoreEarned: 5,
    status: "Accepted",
    submissionsCount: 1,
    lastSubmitted: "2023-05-15T14:30:00Z",
  },
  {
    id: "problem-2",
    name: "Calculate Factorial",
    topicId: "topic-3", // Add this line
    maxScore: 5,
    scoreEarned: 4,
    status: "Accepted",
    submissionsCount: 2,
    lastSubmitted: "2023-05-16T10:15:00Z",
  },
  {
    id: "problem-3",
    name: "Find Maximum Element",
    topicId: "topic-4",
    maxScore: 5,
    scoreEarned: 3,
    status: "Wrong Answer",
    submissionsCount: 3,
    lastSubmitted: "2023-05-17T09:45:00Z",
  },
  {
    id: "problem-4",
    name: "Check Palindrome",
    topicId: "topic-2",
    maxScore: 5,
    scoreEarned: 0,
    status: "Pending",
    submissionsCount: 0,
    lastSubmitted: "",
  },
  {
    id: "problem-5",
    name: "Implement Queue",
    topicId: "topic-7",
    maxScore: 5,
    scoreEarned: 5,
    status: "Accepted",
    submissionsCount: 1,
    lastSubmitted: "2023-05-18T16:20:00Z",
  },
  {
    id: "problem-6",
    name: "Binary Search",
    topicId: "topic-6",
    maxScore: 5,
    scoreEarned: 4,
    status: "Accepted",
    submissionsCount: 2,
    lastSubmitted: "2023-05-19T11:30:00Z",
  },
  {
    id: "problem-7",
    name: "Merge Sort",
    topicId: "topic-6",
    maxScore: 5,
    scoreEarned: 3,
    status: "Wrong Answer",
    submissionsCount: 2,
    lastSubmitted: "2023-05-20T13:45:00Z",
  },
  {
    id: "problem-8",
    name: "Implement Stack",
    topicId: "topic-7",
    maxScore: 5,
    scoreEarned: 5,
    status: "Accepted",
    submissionsCount: 1,
    lastSubmitted: "2023-05-21T09:15:00Z",
  },
];

// Mock submissions
export const submissions: Submission[] = [
  {
    id: "submission-1",
    studentId: "student-1",
    studentCode: "STU001",
    studentName: "Alice Johnson",
    problemId: "problem-1",
    problemName: "Hello World Program",
    code: `
  function helloWorld() {
    console.log("Hello, World!");
  }
  
  helloWorld();
      `,
    testCases: [
      {
        name: "Test Case 1",
        status: "Passed",
        expected: "Hello, World!",
        actual: "Hello, World!",
      },
    ],
    executionTime: "0.05s",
    feedback: "Great job! Your solution is correct and efficient.",
    score: 5,
  },
  {
    id: "submission-2",
    studentId: "student-2",
    studentCode: "STU002",
    studentName: "Bob Smith",
    problemId: "problem-2",
    problemName: "Calculate Factorial",
    code: `
  function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  }
  
  console.log(factorial(5));
      `,
    testCases: [
      {
        name: "Test Case 1",
        status: "Passed",
        expected: "120",
        actual: "120",
      },
      {
        name: "Test Case 2",
        status: "Passed",
        expected: "1",
        actual: "1",
      },
      {
        name: "Test Case 3",
        status: "Failed",
        expected: "Error handling for negative numbers",
        actual: "Stack overflow",
      },
    ],
    executionTime: "0.08s",
    feedback:
      "Your solution works for positive integers, but you need to add error handling for negative numbers.",
    score: 4,
  },
];
