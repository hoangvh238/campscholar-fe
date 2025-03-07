const mockProblems = [
  { title: "C Programming Basics" },
  { title: "Advanced C++ Concepts" },
  { title: "Data Structures and Algorithms: Sorting" },
  { title: "Algorithm Complexity: Time & Space" },
  { title: "English Grammar Practice" },
  { title: "English Listening Comprehension" },
  { title: "Advanced C Programming: Pointers and Memory" },
  { title: "C++ STL: Containers and Algorithms" },
  { title: "Dynamic Programming Challenges" },
  { title: "Graph Algorithms and Techniques" },
];
export const mockComps = [
  {
    type: "cp",
    startTime: new Date("2025-11-01T08:00:00"),
    endTime: new Date("2025-12-01T08:00:00"),
    description:
      "A practice session for basic C programming skills, including simple data structures and basic algorithm implementation.",
    title: "C Programming Basics Review",
    problems: mockProblems.filter((p) => p.title.includes("C")),
    participants: [],
  },
  {
    type: "cp",
    startTime: new Date("2024-11-01T08:00:00"),
    endTime: new Date("2025-12-01T08:00:00"),
    description:
      "Focus on advanced C++ concepts like inheritance, polymorphism, and complex data structures.",
    title: "Advanced C++ Review",
    problems: mockProblems.filter((p) => p.title.includes("C++")),
    participants: [],
  },
  {
    type: "cp",
    startTime: new Date(),
    endTime: new Date(),
    description:
      "Review of data structures and algorithms, focusing on sorting techniques, search algorithms, and algorithm optimization.",
    title: "Data Structures & Algorithms Review",
    problems: mockProblems.filter((p) => p.title.includes("Data Structures")),
    participants: [],
  },
  {
    type: "cp",
    startTime: new Date(),
    endTime: new Date(),
    description:
      "Enhance English skills for international exams, focusing on grammar and listening comprehension exercises.",
    title: "English Grammar & Listening Practice",
    problems: mockProblems.filter((p) => p.title.includes("English")),
    participants: [],
  },
  {
    type: "cp",
    startTime: new Date(),
    endTime: new Date(),
    description:
      "An advanced session on C programming, focusing on pointers, memory management, and dynamic allocation.",
    title: "Advanced C Programming: Pointers & Memory",
    problems: mockProblems.filter((p) => p.title.includes("C Programming")),
    participants: [],
  },
  {
    type: "cp",
    startTime: new Date(),
    endTime: new Date(),
    description:
      "Explore the Standard Template Library (STL) in C++, covering containers, iterators, and algorithms.",
    title: "C++ STL: Containers and Algorithms",
    problems: mockProblems.filter((p) => p.title.includes("C++")),
    participants: [],
  },
  {
    type: "cp",
    startTime: new Date(),
    endTime: new Date(),
    description:
      "Solve dynamic programming problems, learning how to optimize solutions using DP techniques.",
    title: "Dynamic Programming Challenges",
    problems: mockProblems.filter((p) =>
      p.title.includes("Dynamic Programming"),
    ),
    participants: [],
  },
  {
    type: "cp",
    startTime: new Date(),
    endTime: new Date(),
    description:
      "An in-depth session on graph algorithms, including BFS, DFS, and shortest path algorithms.",
    title: "Graph Algorithms and Techniques",
    problems: mockProblems.filter((p) => p.title.includes("Graph")),
    participants: [],
  },
  {
    type: "cp",
    startTime: new Date(),
    endTime: new Date(),
    description:
      "Prepare for international English proficiency exams with focused grammar and listening practice.",
    title: "English Exam Preparation",
    problems: mockProblems.filter((p) => p.title.includes("English")),
    participants: [],
  },
];
