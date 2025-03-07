"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Upload,
} from "lucide-react";
import StudentImportForm from "@/components/core/common/classroom/student-import";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core/common/table";
import { Button } from "@/components/core/common/button";
import { ChevronsUpDown, BarChart3, Users, ListOrdered } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/common/select";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/core/common/dialog";
import { useGetStudentProgressQuery } from "@/store/queries/instructor-classroom";
interface StudentProgress {
  studentId: string;
  studentCode: string;
  studentName: string;
  totalScore: number;
  problemSolved: number;
  progress: number;
}

interface Topic {
  topicId: string;
  topicName: string;
  studentProgresses: StudentProgress[];
}
export default function Trackings({ classroomId }: { classroomId: string }) {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"" | "score" | "progress" | "problems">(
    "",
  );

  const router = useRouter();

  console.log("classroomId:", classroomId); // Debug
  if (!classroomId) {
    return <div>Loading...</div>;
  }
  // Gọi API để lấy dữ liệu thực tế từ backend
  const {
    data: progressData,
    isLoading,
    error,
  } = useGetStudentProgressQuery(classroomId);

  // Lấy danh sách các chủ đề và tiến độ học sinh
  const topics: Topic[] = progressData || [];

  // Lọc danh sách sinh viên theo `selectedTopic`
  const students = useMemo(() => {
    if (selectedTopic === "all") {
      const studentMap = new Map<string, StudentProgress>();
      topics.forEach((topic) => {
        topic.studentProgresses.forEach((student) => {
          if (!studentMap.has(student.studentId)) {
            studentMap.set(student.studentId, { ...student });
          } else {
            const existing = studentMap.get(student.studentId)!;
            studentMap.set(student.studentId, {
              ...existing,
              totalScore: existing.totalScore + student.totalScore,
              problemSolved: existing.problemSolved + student.problemSolved,
              progress: (existing.progress + student.progress) / 2,
            });
          }
        });
      });
      return Array.from(studentMap.values());
    } else {
      const topic = topics.find((t) => t.topicId === selectedTopic);
      return topic ? topic.studentProgresses : [];
    }
  }, [selectedTopic, topics]);

  // Lọc theo từ khóa tìm kiếm
  const filteredStudents = useMemo(() => {
    let filtered = students;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (student) =>
          student.studentName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === "score") return b.totalScore - a.totalScore;
        if (sortBy === "progress") return b.progress - a.progress;
        if (sortBy === "problems") return b.problemSolved - a.problemSolved;
        return 0;
      });
    }

    return filtered;
  }, [students, searchTerm, sortBy]);

  const handleGoToStudentDetail = (studentId: string) => {
    router.push(
      `/administration/classrooms/manage/${classroomId}/student/${studentId}?topic=${selectedTopic}`,
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Classroom Progress Overview
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsImportDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import Students
          </Button>
        </div>
      </div>

      {/* Bộ lọc & tìm kiếm */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* 🔍 Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 rounded-md border py-2 pl-10 pr-3 text-sm"
          />
        </div>

        {/* 📂 Topic Filter */}
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics.map((topic) => (
              <SelectItem key={topic.topicId} value={topic.topicId}>
                {topic.topicName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 🔀 Sort Dropdown */}
        <Select
          value={sortBy || ""}
          onValueChange={(value) =>
            setSortBy(value as "score" | "progress" | "problems")
          }
        >
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="score">
              <SortDesc className="mr-2 inline-block h-4 w-4" />
              Score
            </SelectItem>
            <SelectItem value="progress">
              <SortAsc className="mr-2 inline-block h-4 w-4" />
              Progress
            </SelectItem>
            <SelectItem value="problems">
              <Filter className="mr-2 inline-block h-4 w-4" />
              Problems Solved
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Code</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead className="text-right">Problem Solved</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student: StudentProgress) => (
                <TableRow key={student.studentId}>
                  <TableCell className="font-medium">
                    {student.studentCode}
                  </TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell className="text-right">
                    {student.problemSolved}
                  </TableCell>
                  <TableCell className="text-right">
                    {student.totalScore}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <span className="mr-2">
                        {student.progress.toFixed(1)}%
                      </span>
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleGoToStudentDetail(student.studentId)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Average Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {students.length > 0
                ? (
                    students.reduce(
                      (acc: number, curr: StudentProgress) =>
                        acc + curr.totalScore,
                      0,
                    ) / students.length
                  ).toFixed(1)
                : "N/A"}
            </div>
          </CardContent>
        </Card>

        {/* Highest Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Highest Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {students.length > 0
                ? Math.max(
                    ...students.map((s: StudentProgress) => s.totalScore),
                  )
                : "N/A"}
            </div>
          </CardContent>
        </Card>

        {/* Average Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {students.length > 0
                ? (
                    (students.reduce(
                      (acc: number, curr: StudentProgress) =>
                        acc + curr.progress,
                      0,
                    ) /
                      (progressData.length * 100)) *
                    100
                  ).toFixed(1)
                : "N/A"}
              %
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Import Students Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Students</DialogTitle>
          </DialogHeader>
          <StudentImportForm classroomId={classroomId} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
