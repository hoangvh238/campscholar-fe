"use client";

import "@/styles/globals.css";
import { EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Badge } from "../badge";
import { Button } from "../button";

import CodeEditor from "./code-editor";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/core/common/drawer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/core/common/resizable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/core/common/tabs";

import "katex/dist/katex.min.css";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/core/common/tooltip";

import { SubmissionState } from "./editor-submission-state";

import { useEditorCollapse } from "@/hooks/useEditorCollapse";
import { useThemesLoader } from "@/hooks/useThemeLoader";
import {
  Language,
  Problem,
  SubmissionHistory,
  SubmissionResult,
  TestCase,
} from "@/types/submitsion";
import { cn } from "@/utils/cn";

import { EditorSkeleton } from "./editor-skeleton";

import { RecentSubmissionCard } from "../submit/recent-submissions";

import {
  useEvaluateCodeMutation,
  useGetSubmissionHistoriesQuery,
  useRunCodeMutation,
} from "@/store/queries/grade";

import { ErrorDisplay } from "./ErrorCard";
import { SubmissionDetails } from "./SubmissionDetails";

type RunTestResult = {
  id: string;
  input: string;
  expected_output: string;
  user_output: string;
  passed: boolean;
  execution_time: number;
  cpu_usage_percent: number;
  memory_usage_mb: number;
};

export default function EditorComponent({
  details,
  slot,
  tags,
  testCases,
  languages,
}: {
  details: Problem;
  tags: string[];
  slot: React.ReactNode;
  testCases: TestCase[];
  languages: Language[];
}) {
  const { isCollapsed, ref, collapse, expand } = useEditorCollapse();
  const {
    isCollapsed: isCollapsed2,
    ref: ref2,
    collapse: collapse2,
    expand: expand2,
  } = useEditorCollapse();

  const { themes, loading } = useThemesLoader();
  const router = useRouter();
  const [code, setCode] = useState<string>("");

  const [panelTestcaseSize, setPanelTestcaseSize] = useState(20);
  // Redux user info
  const [userID, setUserId] = useState<string | null>(null);
  const userData = useSelector((state: any) => state.user);

  const [openDrawer, setOpenDrawer] = useState(false);

  // Submission button stuff
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string>("");
  const [submissionId, setSubmissionId] = useState<number | null>(null);

  const [testResults, setTestResults] = useState<{ [key: string]: any }>({});
  const [runErrorResponse, setRunErrorResponse] = useState("");

  const [finalSubmitData, setFinalSubmitData] =
    useState<SubmissionResult | null>(null);
  const [finalSubmitDataError, setFinalSubmitDataError] = useState<string>("");

  const {
    data: submissionHistories,
    isLoading: isLoadingHistories,
    isFetching: isFetchingHistories,
    refetch: refetchSubmissionHistories,
  } = useGetSubmissionHistoriesQuery(
    {
      userId: userID!,
      problemId: details.id,
    },
    {
      skip: !userID,
    },
  );

  const [
    evaluateCode,
    { data, error: errorEvaluate, isLoading: isLoadingEvaluate },
  ] = useEvaluateCodeMutation();

  const [
    runCode,
    { data: dataRunCode, error: errorRun, isLoading: isLoadingRun },
  ] = useRunCodeMutation();

  const handleFinalSubmitCode = async (language: string, problemId: string) => {
    if (!language) {
      toast.error("Please select a language.");
      return;
    }

    try {
      const response = await evaluateCode({
        userId: userID,
        problemId: problemId,
        submissionCode: code,
        language: Number(language),
      }).unwrap();

      if (response.success) {
        toast.success("Submission evaluated successfully!");
        if (response.result?.submissionError) {
          setFinalSubmitData(null);
          setFinalSubmitDataError(response.result?.submissionError?.message);
        } else {
          setFinalSubmitData(response.result);
          setFinalSubmitDataError("");
        }
      } else {
        toast.error("Submission failed to evaluate.");
      }
    } catch (error) {
      console.error("Error evaluating submission:", error);
      toast.error("Error occurred during evaluation. Please try again.");
    }
  };

  const handleSubmitCode = async (language: string, problemId: string) => {
    if (!language) {
      toast.error("Please select a language.");
      return;
    }

    if (ref2.current) {
      ref2.current.resize(60);
    }

    try {
      const runResponse = await runCode({
        problemId: problemId,
        submissionCode: code,
        language: Number.parseInt(language),
      }).unwrap();
      if (runResponse && runResponse.result) {
        if (runResponse.result?.executeResultList != null) {
          const resultsMap = runResponse.result.executeResultList.reduce(
            (
              acc: { [x: string]: any },
              result: { test_case: string | number },
            ) => {
              acc[result.test_case] = result;
              return acc;
            },
            {} as { [key: string]: any },
          );
          setTestResults(resultsMap);
          setRunErrorResponse("");
        }

        if (runResponse.result?.submissionError != null) {
          setRunErrorResponse(runResponse.result?.submissionError?.message);
          setTestResults({});
        }
      }

      setHasRun(true);
      toast.success("Code executed successfully!");
    } catch (err) {
      console.error("Grading failed:", err);
      toast.error("Grading failed. Please try again.");
    }
  };
  useEffect(() => {
    setUserId(userData.userId);
  }, [userData]);

  const getStatusColor = (status: "pending" | "passed" | "failed") => {
    switch (status) {
      case "passed":
        return "text-green-700 dark:text-green-400 data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30";
      case "failed":
        return "text-red-700 dark:text-red-400 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30";
      case "pending":
      default:
        return "text-blue-700 dark:text-blue-400 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30";
    }
  };

  const getStatusIcon = (status: "pending" | "passed" | "failed") => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      case "pending":
      default:
        return <Clock className="h-4 w-4 animate-pulse" />;
    }
  };

  const handleDrawerOpen = (isOpen: boolean) => {
    setOpenDrawer(isOpen);
    if (isOpen) {
      refetchSubmissionHistories();
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        className={cn(
          "max-w-screen relative max-h-[calc(100vh-3.55rem)] min-h-[93svh] w-full border",
        )}
        direction="horizontal"
      >
        <ResizablePanel
          ref={ref}
          collapsible
          className={cn("w-full")}
          defaultSize={40}
          maxSize={60}
          minSize={30}
          style={{ overflow: "hidden" }}
        >
          <div>
            <div className="overflow-auto p-4">
              <div className="flex min-w-56 w-full flex-col gap-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">{details.title}</h1>
                  <Badge className="text-xs" variant="secondary">
                    {details.difficultyLevel
                      ? details.difficultyLevel.charAt(0) +
                        details.difficultyLevel.slice(1).toLowerCase()
                      : ""}
                  </Badge>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="text-xs text-accent-foreground">
                    <span>Tags:</span>
                  </div>
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={cn(
                        "text-xs",
                        "bg-accent-background",
                        "text-accent-foreground",
                        "hover:underline",
                        "hover:cursor-pointer",
                      )}
                      variant="outline"
                      onClick={() =>
                        router.push(
                          `/platform/problems?tag=${tag.toLowerCase()}`,
                        )
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="max-h-[80vh] pr-2 sm:max-h-[60vh] md:max-h-[80vh] lg:max-h-[80vh]">
                  <SubmissionDetails
                    slot={slot}
                    errorMessage={finalSubmitDataError}
                    submissionData={finalSubmitData}
                  ></SubmissionDetails>
                </div>
              </div>
            </div>
          </div>
          {/* Collapsed */}
        </ResizablePanel>
        <div className="border-secondary-muted flex flex-col items-center justify-center border-r dark:border-r dark:border-neutral-800">
          <Tooltip>
            <TooltipTrigger>
              <ResizableHandle
                withHandle
                className={cn(
                  {
                    "z-50 translate-x-2 transform": isCollapsed,
                  },
                  "cursor-col-resize",
                )}
                onClickCapture={() => {
                  if (isCollapsed) {
                    expand();
                  } else {
                    // collapse();
                  }
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Resize</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ResizablePanel className="w-[70dvw] max-w-screen-2xl" defaultSize={75}>
          <ResizablePanelGroup className="w-full" direction="vertical">
            {/*  Code Editor Section */}
            <ResizablePanel
              className="min-w-full"
              defaultSize={80}
              minSize={40}
            >
              <div className="flex h-full w-full items-center justify-center">
                {loading && <EditorSkeleton />}
                {!loading && (
                  <CodeEditor
                    code={code}
                    error={errorRun ? "Error running code" : ""}
                    handleFinalSubmitCode={handleFinalSubmitCode}
                    handleSubmitCode={handleSubmitCode}
                    languages={languages}
                    problemId={details.id}
                    setCode={setCode}
                    setSubmissionId={setSubmissionId as any}
                    submissionId={submissionId}
                    submissionLoading={isLoadingRun || isLoadingEvaluate}
                    themes={themes}
                  />
                )}
              </div>
            </ResizablePanel>
            <Tooltip>
              <TooltipTrigger>
                <ResizableHandle
                  withHandle
                  className={cn(
                    {
                      "z-50 mb-2 translate-x-2 transform": isCollapsed2,
                    },
                    "cursor-row-resize",
                  )}
                  onClickCapture={() => {
                    if (isCollapsed2) {
                      expand2();
                    }
                    // else {
                    //   collapse2();
                    // }
                  }}
                />
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p>Resize</p>
              </TooltipContent>
            </Tooltip>
            {/* Submission Section */}
            <ResizablePanel
              ref={ref2}
              collapsible
              className="backdrop-blur-3xl backdrop-filter"
              collapsedSize={0}
              defaultSize={panelTestcaseSize}
              maxSize={90}
              minSize={0}
              style={{
                overflow: "auto",
              }}
              onCollapse={collapse2}
            >
              <div className="h-100 mx-5 my-4 space-y-4 overflow-auto">
                <div className="flex items-center">
                  <div className="text-lg font-bold">
                    {(isLoadingRun || isLoadingEvaluate) && (
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-yellow-500">
                          Pending
                        </div>
                        <ReloadIcon className="h-6 w-6 animate-spin" />
                      </div>
                    )}
                    {submissionError && (
                      <div className="text-center text-sm">
                        {submissionError}
                      </div>
                    )}

                    {!hasRun && <span>Submission Details</span>}
                    {testResults &&
                      hasRun &&
                      runErrorResponse == "" &&
                      !isLoadingRun &&
                      !isLoadingEvaluate && (
                        <SubmissionState submission={testResults} />
                      )}
                  </div>
                  <div className="ml-auto flex min-w-0 items-center space-x-4">
                    <Drawer open={openDrawer} onOpenChange={handleDrawerOpen}>
                      <DrawerTrigger asChild>
                        <Button
                          className="flex scale-90 gap-2"
                          variant="outline"
                        >
                          <EyeOpenIcon className="h-4 w-4" />
                          <span>View Submissions</span>
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Your 5 Latest Submissions</DrawerTitle>
                          <DrawerDescription>
                            See your submissions detail both code and analysis.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="mx-6 flex flex-col gap-4">
                          <Tabs
                            className={cn("max-h-96 w-full overflow-y-scroll")}
                            defaultValue="problem"
                          >
                            <TabsContent value="problem">
                              {submissionHistories?.length === 0 ? (
                                <div className="text-center text-gray-500">
                                  Not have any submission !
                                </div>
                              ) : (
                                <ul className="grid grid-flow-row grid-cols-3 gap-4">
                                  {submissionHistories?.map(
                                    (submission: SubmissionHistory) => (
                                      <RecentSubmissionCard
                                        key={submission.id}
                                        submission={submission}
                                      />
                                    ),
                                  )}
                                </ul>
                              )}
                            </TabsContent>
                          </Tabs>
                        </div>
                        <DrawerFooter className={cn("mt-4 w-full")}>
                          <DrawerClose>
                            <Button className="w-full" variant="outline">
                              Done
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-4">
                  <Tabs
                    className={cn("w-full")}
                    defaultValue={`case-${testCases.length - 1}`}
                  >
                    <ErrorDisplay errorMessage={runErrorResponse} />
                    <TabsList className="mb-4 flex-wrap">
                      {testCases.map((_, index) => {
                        const result = testResults[_.id];

                        const status =
                          isLoadingRun || isLoadingEvaluate
                            ? "pending"
                            : hasRun
                              ? result?.passed
                                ? "passed"
                                : "failed"
                              : "pending";
                        return (
                          <TabsTrigger
                            key={index}
                            className={cn(
                              "flex items-center gap-2 transition-colors",
                              getStatusColor(status),
                            )}
                            value={`case-${index}`}
                          >
                            Test Case {index + 1}
                            {getStatusIcon(status)}
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                    {testCases.map((test, index) => {
                      const result = testResults[test.id];
                      console.log(testResults);

                      const status =
                        isLoadingRun || isLoadingEvaluate
                          ? "pending"
                          : hasRun
                            ? result?.passed
                              ? "passed"
                              : "failed"
                            : "pending";
                      return (
                        <TabsContent key={index} value={`case-${index}`}>
                          <div
                            className={cn(
                              "flex flex-col gap-4 rounded-md border p-6 transition-colors",
                              status === "passed" &&
                                "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/30",
                              status === "failed" &&
                                "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30",
                              status === "pending" &&
                                "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
                            )}
                          >
                            <TestCaseSection
                              content={test.input}
                              title="Input"
                            />
                            <TestCaseSection
                              content={test.expected_output}
                              title="Expected Output"
                            />
                            <TestCaseSection
                              content={
                                result?.user_output || "No output available"
                              }
                              status={status}
                              title="Your Output"
                            />
                            {hasRun && (
                              <div
                                className={cn(
                                  "flex items-center justify-between rounded-md px-4 py-2",
                                  status === "passed"
                                    ? "bg-green-100 dark:bg-green-900/50"
                                    : status === "failed"
                                      ? "bg-red-100 dark:bg-red-900/50"
                                      : "bg-blue-100 dark:bg-blue-900/50",
                                )}
                              >
                                <span
                                  className={cn(
                                    "flex items-center gap-2 text-sm font-medium",
                                    status === "passed"
                                      ? "text-green-700 dark:text-green-300"
                                      : status === "failed"
                                        ? "text-red-700 dark:text-red-300"
                                        : "text-blue-700 dark:text-blue-300",
                                  )}
                                >
                                  {status === "passed" && (
                                    <>
                                      Passed <CheckCircle className="h-4 w-4" />
                                    </>
                                  )}
                                  {status === "failed" && (
                                    <>
                                      Failed <XCircle className="h-4 w-4" />
                                    </>
                                  )}
                                  {status === "pending" && (
                                    <>
                                      Pending{" "}
                                      <Clock className="h-4 w-4 animate-pulse" />
                                    </>
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      );
                    })}
                    {/* <TabsContent value="case-custom">
                      <div className="rounded-md border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/30">
                        <CustomInput input={input} />
                        <CustomInputResult result={output} />
                      </div>
                    </TabsContent> */}
                  </Tabs>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

function TestCaseSection({
  title,
  content,
  status,
}: {
  title: string;
  content: string;
  status?: "passed" | "failed" | "pending";
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">
        {title}
      </h3>
      <pre
        className={cn(
          "overflow-x-auto rounded-md p-3 font-mono text-sm",
          status === "passed" &&
            "bg-emerald-100/50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100",
          status === "failed" &&
            "bg-rose-100/50 text-rose-900 dark:bg-rose-900/20 dark:text-rose-100",
          !status &&
            "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
        )}
      >
        {content}
      </pre>
    </div>
  );
}
