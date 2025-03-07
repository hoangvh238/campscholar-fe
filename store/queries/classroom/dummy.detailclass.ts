export interface ClassData {
  id: string
  name: string
  courseCode: string
  fullName: string
  instructor: string
  semester: string
  startDate: string
  endDate: string
  assignments: number
  progress: number
  color: string
  totalStudent: number
  numberOfTopic: number
}
  
  export interface Topic {
    id: string
    title: string
    totalProblems: number
    completedProblems: number
    status: string
    difficulty: string
    problems?: ProblemForEachTopic[]
  }
  
  export interface ProblemForEachTopic {
    problemId: string
    problemName: string
    difficulty: number
    isSolved: boolean
  }
  

  export interface ProblemTopic {
    id: string
    name: string
    difficultyLevel: string
    categories: { name: string; id: string }[]
    point: number
    resolvedStatus: string
    updatedDate: string 
  }
  
  export interface LeaderboardEntry {
    id: string
    name: string
    avatar: string
    solvedProblems: number
    score: number
    rank: number
  }
  
  export interface ActivityEntry {
    id: string
    type: string
    problemName?: string
    topicName?: string
    achievementName?: string
    timestamp: string
    points: number
    days?: number
  }
  
  
  
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  
  export const dummyApi = {
    getClassDetail: async (classId: string): Promise<ClassData> => {
      await delay(1000); // Giả lập độ trễ API
    
      return {
        id: classId,
        courseCode: "CSD201", // Đảm bảo có courseCode
        name: "Data Structures and Algorithms",
        fullName: "Data Structures and Algorithms - CSD201", // Thêm fullName đầy đủ
        instructor: "Dr. Nguyen Van A",
        semester: "Spring 2025",
        startDate: "2025-01-15",
        endDate: "2025-05-30",
        assignments: 88,
        progress: 32,
        color: "blue", // Thêm color để tránh lỗi thiếu dữ liệu
        totalStudent: 120, // Giả định số sinh viên
        numberOfTopic: 5,
      };
    },
  
    getTopics: async (classId: string): Promise<Topic[]> => {
      await delay(1000)
      return [
        {
          id: "1",
          title: "Arrays and Strings",
          totalProblems: 15,
          completedProblems: 15,
          status: "completed",
          difficulty: "easy",
        },
        {
          id: "2",
          title: "Linked Lists",
          totalProblems: 20,
          completedProblems: 14,
          status: "in-progress",
          difficulty: "medium",
        },
        {
          id: "3",
          title: "Trees and Graphs",
          totalProblems: 25,
          completedProblems: 0,
          status: "not-started",
          difficulty: "hard",
        },
      ]
    },
  
    getProblems: async (classId: string, topicId: string): Promise<ProblemTopic[]> => {
      await delay(1000)
      return [
        {
            name: "Sum of Two Numbers",
            difficultyLevel: "Medium",
            point: 10,
            categories: [
              { name: "Backtracking", id: "2b0f8c4e-d608-426a-abb8-be1927e9e482" },
              { name: "Dynamic Programming", id: "9f43dbaf-ffa3-4166-b6c7-4d45de791ac2" },
            ],
            updatedDate: "02/23/2025 12:15:00",
            resolvedStatus: "NotAttempted",
            id: "2f115340-3737-4ff3-b29a-7a8efab12f89",
          },
          {
            name: "Find the Missing Number",
            difficultyLevel: "Easy",
            point: 30,
            categories: [
              { name: "Backtracking", id: "2b0f8c4e-d608-426a-abb8-be1927e9e482" },
              { name: "Artificial Intelligence", id: "ef687b5f-da40-4648-b8ab-b8c29eb3182d" },
              { name: "Blockchain Technology", id: "f644b3d9-88ed-4d2e-a1b7-b863055197d7" },
            ],
            updatedDate: "02/23/2025 14:02:31",
            resolvedStatus: "NotAttempted",
            id: "fac3d947-1f53-4ca2-8076-8fd7293332d2",
          },
          {
            name: "Find the Largest Submatrix with Rearrangements",
            difficultyLevel: "Hard",
            point: 100,
            categories: [
              { name: "Artificial Intelligence", id: "ef687b5f-da40-4648-b8ab-b8c29eb3182d" },
              { name: "Bit Manipulation", id: "f3f1ba6e-b373-439d-b341-466d1aa62173" },
              { name: "Blockchain Technology", id: "f644b3d9-88ed-4d2e-a1b7-b863055197d7" },
            ],
            updatedDate: "02/26/2025 10:19:27",
            resolvedStatus: "NotAttempted",
            id: "0860b8e8-872a-4466-b3fd-fbb752154782",
          },
      ]
    },
  
    getLeaderboard: async (classId: string): Promise<LeaderboardEntry[]> => {
      await delay(1000)
      return Array.from({ length: 10 }, (_, i) => ({
        id: `student-${i + 1}`,
        name: `Student ${i + 1}`,
        avatar: `/placeholder.svg?height=40&width=40`,
        solvedProblems: 30 - i * 2,
        score: 1000 - i * 75,
        rank: i + 1,
      }))
    },
  
    getActivity: async (classId: string): Promise<ActivityEntry[]> => {
      await delay(1000)
      return [
        {
          id: "1",
          type: "problem-solved",
          problemName: "Two Sum",
          topicName: "Arrays and Strings",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          points: 50,
        },
        {
          id: "2",
          type: "achievement",
          achievementName: "First Medium Problem",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          points: 100,
        },
        {
          id: "3",
          type: "problem-solved",
          problemName: "Reverse Linked List",
          topicName: "Linked Lists",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          points: 75,
        },
        {
          id: "4",
          type: "streak",
          days: 5,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
        },
      ]
    },
  }
  
  