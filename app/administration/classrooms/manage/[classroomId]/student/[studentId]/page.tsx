"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Download, SortAsc, SortDesc } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/common/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Badge } from "@/components/core/common/badge";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useGetStudentSubmissionsQuery } from "@/store/queries/instructor-classroom";

interface Problem {
  problemId: string;
  problemName: string;
  maxScore: number;
  scoreEarned: number;
  status: string;
  submissions: number;
  lastSubmitted: string | null;
  topicId: string;
}

interface Topic {
  topicId: string;
  topicName: string;
  problems: Problem[];
}

interface StudentData {
  studentId: string;
  studentCode: string;
  studentName: string;
  overallProgress: number;
  topics: Topic[];
}

export default function StudentProgressPage() {
  const { classroomId, studentId } = useParams();

  const {
    data: studentData,
    isLoading,
    error,
  } = useGetStudentSubmissionsQuery({
    classroomId,
    studentId,
  });

  const searchParams = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState("all");

  useEffect(() => {
    const initialTopic = searchParams.get("topic") || "all";
    setSelectedTopic(initialTopic);
  }, [searchParams]);

  const allProblems = useMemo(() => {
    if (!studentData) return []; // Prevents running with undefined data
    return studentData.topics.flatMap((topic: Topic) =>
      topic.problems.map((problem: Problem) => ({
        ...problem,
        topicId: topic.topicId,
      })),
    );
  }, [studentData]);

  const filteredProblems =
    selectedTopic === "all"
      ? allProblems
      : allProblems.filter(
          (problem: Problem) => problem.topicId === selectedTopic,
        );

  const problemsByTopic = useMemo(() => {
    return filteredProblems.reduce(
      (acc: Record<string, Problem[]>, problem: Problem) => {
        if (!acc[problem.topicId]) acc[problem.topicId] = [];
        acc[problem.topicId].push(problem);
        return acc;
      },
      {} as Record<string, Problem[]>,
    );
  }, [filteredProblems]);

  const handleExport = () => {
    alert("Exporting data to Excel...");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading student data</p>;
  if (!studentData) return <p>No data available for this student.</p>;

  return (
    <div className="min-h-screen w-full space-y-2 p-6 pb-4">
      <div>
        <Button variant="outline" size="sm" asChild className="mb-2">
          <Link href={`/administration/classrooms/manage/${classroomId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Class Progress
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {studentData.studentName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Student Code: {studentData.studentCode} | Overall Progress:{" "}
          {studentData.overallProgress.toFixed(1)}%
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-64">
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {studentData.topics.map((topic: Topic) => (
                <SelectItem key={topic.topicId} value={topic.topicId}>
                  {topic.topicName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">
          Showing {filteredProblems.length} problems
        </p>
      </div>

      {Object.entries(problemsByTopic).map(([topicId, topicProblems]) => {
        const topic = studentData.topics.find(
          (t: Topic) => t.topicId === topicId,
        );
        return (
          <Card key={topicId}>
            <CardHeader>
              <CardTitle>{topic ? topic.topicName : "Unknown Topic"}</CardTitle>
              <CardDescription>Problem progress for this topic</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Problem Name</TableHead>
                    <TableHead className="text-right">Max Score (5)</TableHead>
                    <TableHead className="text-right">Score Earned</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Submissions</TableHead>
                    <TableHead>Last Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(topicProblems) &&
                    topicProblems.map((problem: Problem) => (
                      <TableRow key={problem.problemId}>
                        <TableCell className="font-medium">
                          {problem.problemName}
                        </TableCell>
                        <TableCell className="text-right">
                          {problem.maxScore}
                        </TableCell>
                        <TableCell className="text-right">
                          {problem.scoreEarned}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              problem.status === "Accepted"
                                ? "success"
                                : problem.status === "Wrong Answer"
                                  ? "destructive"
                                  : "warning"
                            }
                          >
                            {problem.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {problem.submissions}
                        </TableCell>
                        <TableCell>
                          {problem.lastSubmitted
                            ? new Date(
                                problem.lastSubmitted,
                              ).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          {problem.submissions > 0 && (
                            <Button asChild size="sm">
                              <Link
                                href={`/administration/classrooms/manage/${classroomId}/student/${studentId}/submission/submission-1`}
                              >
                                View Submission
                              </Link>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              {selectedTopic !== "all" && (
                <Button variant="outline" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export to Excel
                </Button>
              )}
              <div className="text-sm font-medium text-muted-foreground">
                Summary:{" "}
                {Array.isArray(topicProblems) && topicProblems.length > 0
                  ? (
                      (topicProblems.reduce(
                        (acc, curr) => acc + curr.scoreEarned,
                        0,
                      ) /
                        topicProblems.reduce(
                          (acc, curr) => acc + curr.maxScore,
                          0,
                        )) *
                      10
                    ).toFixed(1)
                  : "0.0"}{" "}
                / 10
              </div>
            </CardFooter>
          </Card>
        );
      })}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {filteredProblems.reduce(
                (acc: number, curr: Problem) => acc + curr.scoreEarned,
                0,
              )}{" "}
              /{" "}
              {filteredProblems.reduce(
                (acc: number, curr: Problem) => acc + curr.maxScore,
                0,
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                (filteredProblems.filter(
                  (p: Problem) => p.status === "Accepted",
                ).length /
                  filteredProblems.length) *
                  100,
              )}
              %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {filteredProblems.reduce(
                (acc: number, curr: Problem) => acc + curr.submissions,
                0,
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
