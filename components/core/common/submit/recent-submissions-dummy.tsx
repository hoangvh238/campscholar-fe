"use client";
import { CircleDot } from "lucide-react";
import moment from "moment";

import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

import { DialogSubmission } from "./dialog-submission";

import { SubmissionMock, SubmissionStatus } from "@/types/submitsion";
import { cn } from "@/utils/cn";

const languageColors: { [key: string]: string } = {
  python: "text-python fill-python",
  javascript: "text-javascript fill-javascript",
  java: "text-java fill-java",
  c: "text-c fill-c",
  "c++": "text-c++ fill-c++",
  "c#": "text-c# fill-c#",
  go: "text-go fill-go",
  kotlin: "text-kotlin fill-kotlin",
  ruby: "text-ruby fill-ruby",
  rust: "text-rust fill-rust",
  swift: "text-swift fill-swift",
  typescript: "text-typescript fill-typescript",
};

const getColorClass = (language: string) => {
  return languageColors[language.toLowerCase()];
};
function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const variantStyles = {
    ACCEPTED: {
      border: "border-green-500",
    },
    WRONG_ANSWER: {
      border: "border-red-500",
    },
    TIME_LIMIT_EXCEEDED: {
      border: "border-red-500",
    },
    MEMORY_LIMIT_EXCEEDED: {
      border: "border-red-500",
    },
    RUNTIME_ERROR: {
      border: "border-red-500",
    },
    COMPILE_TIME_ERROR: {
      border: "border-red-500",
    },
    PENDING: {
      border: "border-yellow-500",
    },
  };
  return (
    <Badge
      className={`text-xs ${variantStyles[status].border} font-medium text-secondary-foreground dark:text-muted-foreground`}
      variant={`outline`}
    >
      {status.split("")[0].toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export function RecentSubmissionDummyCard({
  submission,
}: {
  submission: SubmissionMock;
}) {
  const submissionStatus = submission.status as SubmissionStatus;
  return (
    <>
      <div className="hidden md:block">
        <DialogSubmission submission={submission}>
          <Card className="cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-lg">
            <CardHeader className="grid grid-cols-[1fr_100px] items-end gap-8 space-y-0">
              <div className="space-y-1">
                <CardTitle>{submission.problem.title}</CardTitle>
              </div>
              <div className="flex items-center justify-end space-x-1">
                <SubmissionStatusBadge status={submissionStatus} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <CircleDot
                    className={cn(
                      "mr-2 size-2",
                      submission.language.name &&
                        getColorClass(submission.language.name),
                    )}
                  />
                  {submission.language.name}
                </div>
                <div>{moment(submission.submit_time).fromNow()}</div>
              </div>
            </CardContent>
          </Card>
        </DialogSubmission>
      </div>
      <Card
        className={cn(
          "cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-lg md:hidden",
        )}
      >
        <CardHeader className="grid grid-cols-[1fr_100px] items-end gap-8 space-y-0">
          <div className="space-y-1">
            <CardTitle>{submission.problem.title}</CardTitle>
          </div>
          <div className="flex items-center justify-end space-x-1">
            <SubmissionStatusBadge status={submissionStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <CircleDot
                className={cn(
                  "mr-2 size-2",
                  submission.language.name &&
                    getColorClass(submission.language.name),
                )}
              />
              {submission.language.name}
            </div>
            <div>{moment(submission.submit_time).fromNow()}</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
