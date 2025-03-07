"use client";
import { BarChart, CircleDot, Code2, Loader2 } from "lucide-react";
import moment from "moment";

import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Button } from "../button";
import SubmissionDrawer from "../editor/submission-drawer";
import { ErrorDisplay } from "../editor/ErrorCard";

import { SubmissionHistory, SubmissionStatus } from "@/types/submitsion";
import { getLanguageNameFromId } from "@/utils/getLanguageById";
import { cn } from "@/utils/cn";

const languageColors: { [key: string]: string } = {
  python: "text-python fill-python",
  javascript: "text-javascript fill-javascript",
  java: "text-java fill-java",
  c: "text-c fill-c",
  "c++": "text-c++ fill-c++",
  "c#": "text-c# fill-c#",
  kotlin: "text-kotlin fill-kotlin",
  ruby: "text-ruby fill-ruby",
};

const getColorClass = (language: string) => {
  return languageColors[language.toLowerCase()];
};
function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const variantStyles: {
    [key in SubmissionStatus]: {
      variant: "default" | "destructive" | "outline";
      className: string;
    };
  } = {
    ACCEPTED: {
      variant: "default",
      className: "bg-green-500 hover:bg-green-600",
    },
    WRONG_ANSWER: {
      variant: "destructive",
      className: "",
    },
    TIME_LIMIT_EXCEEDED: {
      variant: "destructive",
      className: "",
    },
    MEMORY_LIMIT_EXCEEDED: {
      variant: "destructive",
      className: "",
    },
    RUNTIME_ERROR: {
      variant: "destructive",
      className: "",
    },
    COMPILE_TIME_ERROR: {
      variant: "destructive",
      className: "",
    },
    PENDING: {
      variant: "outline",
      className: "border-yellow-500 text-yellow-500",
    },
  };
  return (
    <Badge
      className={cn("text-xs font-medium", variantStyles[status].className)}
      variant={variantStyles[status].variant}
    >
      {status === "PENDING" ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-3 w-3 animate-spin" />
          Pending
        </div>
      ) : (
        status.split("_").join(" ")
      )}
    </Badge>
  );
}

export function RecentSubmissionCard({
  submission,
}: {
  submission: SubmissionHistory;
}) {
  const submissionStatus: SubmissionStatus =
    submission.status === "PENDING"
      ? "PENDING"
      : submission.totalPassedTestCases === submission.totalTestCases
        ? submission.errorMessage
          ? "WRONG_ANSWER"
          : "ACCEPTED"
        : "WRONG_ANSWER";

  const languageName = getLanguageNameFromId(submission.language);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-lg">
          <ErrorDisplay errorMessage={submission.errorMessage || ""} />
          <CardHeader className="grid grid-cols-[1fr_auto] items-end gap-4 space-y-0">
            <div className="space-y-1">
              <CardTitle className="line-clamp-1">
                Submit {moment(submission.updatedDate).fromNow()}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <SubmissionStatusBadge status={submissionStatus} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CircleDot
                  className={cn(
                    "mr-2 h-2 w-2",
                    languageName && getColorClass(languageName),
                  )}
                />
                {languageName}
              </div>
              <div>
                {submissionStatus !== "PENDING" && (
                  <Badge className="font-mono" variant="outline">
                    {submission.totalPassedTestCases}/
                    {submission.totalTestCases}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle>
            Submit {moment(submission.updatedDate).fromNow()}
          </DrawerTitle>
        </DrawerHeader>
        <Tabs className="p-6" defaultValue="statistics">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger className="flex items-center gap-2" value="statistics">
              <BarChart className="h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="code">
              <Code2 className="h-4 w-4" />
              Code
            </TabsTrigger>
          </TabsList>
          <TabsContent className="mt-0" value="statistics">
            <SubmissionDrawer result={submission} />
          </TabsContent>
          <TabsContent className="mt-0" value="code">
            <div className="relative">
              <Button
                className="absolute right-4 top-4"
                size="sm"
                variant="outline"
                onClick={() =>
                  navigator.clipboard.writeText(submission.submissionCode)
                }
              >
                Copy Code
              </Button>
              <pre className="max-h-[60vh] overflow-auto rounded-lg bg-muted p-8 font-mono text-sm">
                <code>{submission.submissionCode}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
