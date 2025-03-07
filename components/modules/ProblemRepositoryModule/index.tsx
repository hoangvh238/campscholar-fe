"use client";

import { Button } from "@/components/core/common/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import { Collapsible } from "@/components/core/common/collapsible";
import { columnsInstructor } from "@/components/core/common/problemTable/columns-instructor";
import { DataTableInstructor } from "@/components/core/common/problemTable/data-table-instructor";
import { Skeleton } from "@/components/core/common/skeleton";
import {
  useGetProblemAnalysisQuery,
  useGetProblemDifficultyAnalysisQuery,
  useGetProblemTrendAnalysisQuery,
} from "@/store/queries/problem";
import {
  BookOpen,
  BrainCircuit,
  PlusCircle,
  Target,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { DifficultyDistribution } from "./TeacherTool/difficulty-distribution";
import { StudentInteraction } from "./TeacherTool/student-interaction";
import { TeacherStatCard } from "./TeacherTool/teacher-stat-card";

export default function TeacherProblemModule() {
  const router = useRouter();

  const { data: problemAnalysis, isLoading: isLoadingAnalysis } =
    useGetProblemAnalysisQuery();
  const { data: difficultyAnalysis, isLoading: isLoadingDifficulty } =
    useGetProblemDifficultyAnalysisQuery();
  const { data: trendAnalysis, isLoading: isLoadingTrend } =
    useGetProblemTrendAnalysisQuery();

  const teacherStats = {
    totalProblems: problemAnalysis?.result?.myProblems ?? 0,
    systemProblems: problemAnalysis?.result?.totalProblems ?? 0,
    activeStudents: problemAnalysis?.result?.activeStudents ?? 0,
    activeStudentsGrowth: problemAnalysis?.result?.activeStudentsGrowth ?? 0,
    mostAttempted: problemAnalysis?.result?.mostAttemptedProblem ?? "N/A",
    mostAttemptedCount: problemAnalysis?.result?.mostAttemptedCount ?? 0,
    popularTopic: problemAnalysis?.result.popularCategory?.name ?? "N/A",
    popularTopicPercentage: `${problemAnalysis?.result?.popularCategoryAttempt ?? 0}%`,
  };

  const interactionData = trendAnalysis?.result.map((item) => ({
    date: item.date,
    day: item.day,
    attempts: item.attempts,
  }));

  const difficultyData = [
    {
      name: "Easy",
      value: difficultyAnalysis?.result.easyPercentage.percentage ?? 0,
      number: difficultyAnalysis?.result.easyPercentage.numberOfItems ?? 0,
      color: "#22c55e",
    },
    {
      name: "Medium",
      value: difficultyAnalysis?.result.mediumPercentage.percentage ?? 0,
      number: difficultyAnalysis?.result.mediumPercentage.numberOfItems ?? 0,
      color: "#eab308",
    },
    {
      name: "Hard",
      value: difficultyAnalysis?.result.hardPercentage.percentage ?? 0,
      number: difficultyAnalysis?.result.hardPercentage.numberOfItems ?? 0,
      color: "#ef4444",
    },
  ];

  return (
    <div className="min-h-screen w-full space-y-2 p-6 pb-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          {isLoadingDifficulty ? (
            <Skeleton className="h-[100px] w-full rounded-lg" />
          ) : (
            <Collapsible title="Your Problem Difficulty">
              <DifficultyDistribution data={difficultyData} />
            </Collapsible>
          )}
        </div>
        <div className="w-1/2">
          {isLoadingTrend ? (
            <Skeleton className="h-[100px] w-full rounded-lg" />
          ) : (
            <Collapsible title="Student Interaction Trend">
              <StudentInteraction data={interactionData || []} />
            </Collapsible>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="col-span-1 h-full md:col-span-4">
          {isLoadingAnalysis ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[600px] w-full" />
            </div>
          ) : (
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold dark:text-white">
                  Problem List
                </CardTitle>
                <Button
                  className="hover:bg-primary-dark bg-primary text-white"
                  onClick={() => router.push("/administration/problems/create")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Problem
                </Button>
              </CardHeader>
              <CardContent>
                <DataTableInstructor columns={columnsInstructor} />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="col-span-1 grid h-full grid-cols-1 gap-4">
          {isLoadingAnalysis ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
            ))
          ) : (
            <>
              <TeacherStatCard
                title="My Problems"
                value={teacherStats.totalProblems}
                description="Problems created by you"
                icon={BookOpen}
                secondaryValue={teacherStats.systemProblems}
                secondaryLabel="Total in system"
              />
              <TeacherStatCard
                title="Most Attempted"
                value={teacherStats.mostAttemptedCount}
                description={teacherStats.mostAttempted}
                icon={Target}
                secondaryValue="attempts"
                highlight
              />
              <TeacherStatCard
                title="Active Students"
                value={teacherStats.activeStudents}
                description="Students attempting your problems"
                icon={Users}
                secondaryValue={`${teacherStats.activeStudentsGrowth ?? 0}% this week`}
                trend="up"
              />
              <TeacherStatCard
                title="Popular Category"
                value={teacherStats.popularTopic}
                description="Most engaged Category"
                icon={BrainCircuit}
                secondaryValue={`${teacherStats.popularTopicPercentage ?? 0} of attempts`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
