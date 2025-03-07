"use client";

import * as React from "react";
import {
  CheckCircle2,
  Clock,
  MemoryStickIcon as Memory,
  Code,
  Trophy,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import { Progress } from "@/components/core/common/progress";
import { Badge } from "@/components/core/common/badge";
import { SubmissionHistory } from "@/types/submitsion";
import { useGetSubmissionByIdQuery } from "@/store/queries/grade";
import { getLanguageNameFromId } from "@/utils/getLanguageById";

interface TestCase {
  testCaseId: string;
  isPassed: boolean;
  userOutput: string;
}
export interface apiSubmission {
  submissionId?: string;
  gradedById?: string | null;
  gradingMethod?: number;
  runtime?: number;
  score?: number;
  feedback?: string | null;
  totalPassedTestCases?: number;
  totalTestCases?: number;
  gradingResultList?: GradingResult[];
  totalMemoryUsageInMB?: number;
  id?: string;
  isPassed?: boolean;
  submissionCode?: string;
  language: number;
}

export interface Grading {
  submissionId: string;
  gradedById: string | null;
  gradingMethod: number;
  runtime: number;
  score: number;
  feedback: string | null;
  totalPassedTestCases: number;
  totalTestCases: number;
  gradingResultList: GradingResult[];
  totalMemoryUsageInMB: number;
  id: string;
}

export interface GradingResult {
  testCaseId: string;
  isPassed: boolean;
  userOutput: string;
}

export interface GradingResult {
  testCaseId: string;
  isPassed: boolean;
  userOutput: string;
}

export default function SubmissionDrawer({
  result,
}: {
  result: SubmissionHistory;
}) {
  const {
    data: apiSubmission,
    isLoading,
    error,
  } = useGetSubmissionByIdQuery({
    id: result?.id,
  });
  if (isLoading) {
    return <p>Loading current submission...</p>;
  }

  if (error) {
    return <p>Error loading current submission.</p>;
  }

  if (!apiSubmission) {
    return <p>No submission data available.</p>;
  }

  const passedTests = apiSubmission?.totalPassedTestCases || 0;
  const totalTests = apiSubmission?.totalTestCases || 0;
  const passRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
  return (
    <div className="mx-auto w-full space-y-4 p-3 sm:space-y-6 sm:p-6">
      <Card className="relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            passRate === 100 ? "bg-green-500/10" : "bg-red-500/10"
          } dark:opacity-20`}
        />
        <CardHeader className="space-y-2 sm:space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl font-bold sm:text-2xl">
                Submission Result
              </CardTitle>
              <CardDescription className="mt-1 text-sm sm:text-base">
                <span className="hidden sm:inline">Submission #</span>
                <span className="sm:hidden">#</span>
                {apiSubmission?.id?.slice(
                  0,
                  8,
                )} • Attempt {apiSubmission.score}
              </CardDescription>
            </div>
            <Badge
              className="w-fit px-3 py-1 text-sm"
              variant={passRate === 100 ? "default" : "destructive"}
            >
              {passRate === 100 ? "Passed" : "Failed"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            <StatsCard
              className="col-span-2 sm:col-span-1"
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Pass Rate"
              subValue={`${passRate.toFixed(1)}%`}
              value={`${passedTests}/${totalTests}`}
            />
            <StatsCard
              className="col-span-2 sm:col-span-1"
              icon={<Trophy className="h-4 w-4 text-yellow-500" />}
              label="Score"
              subValue="Points"
              value={apiSubmission?.score?.toString() || "0"}
            />
            <StatsCard
              icon={<Clock className="h-4 w-4" />}
              label="Runtime"
              subValue="Time"
              value={`${apiSubmission?.runtime?.toFixed(3)}s`}
            />
            <StatsCard
              icon={<Memory className="h-4 w-4" />}
              label="Memory"
              subValue="MB Used"
              value={`${apiSubmission?.totalMemoryUsageInMB?.toFixed(2)}`}
            />
            <StatsCard
              icon={<Code className="h-4 w-4" />}
              label="Language"
              subValue="Lang"
              value={getLanguageNameFromId(apiSubmission.language)}
            />
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Test Cases Progress</span>
              <span className="text-muted-foreground">
                {passRate.toFixed(1)}% Complete
              </span>
            </div>
            <Progress className="h-2" value={passRate} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({
  icon,
  label,
  value,
  subValue,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="p-3 sm:p-4 sm:pt-6">
        <div className="flex items-center gap-1.5 text-muted-foreground sm:gap-2">
          {icon}
          <span className="text-xs font-medium sm:text-sm">{label}</span>
        </div>
        <div className="mt-1.5 space-y-0.5 sm:mt-2 sm:space-y-1">
          <p className="text-base font-bold sm:text-2xl">{value}</p>
          <p className="text-[10px] text-muted-foreground sm:text-xs">
            {subValue}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
