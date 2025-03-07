"use client";

import { useParams } from "next/navigation";

import { dummyProblem } from "./data";

import { Editor } from "@/components/core/common/editor/editor";
import { useGetProblemByIdQuery } from "@/store/queries/problem";
import { supportCodeLanguage } from "@/types/code-language-supporting";
import { Skeleton } from "@/components/core/common/skeleton";
import { useGettestcasebyproblemidQuery } from "@/store/queries/testcase";

function ProblemModule() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    data: problem,
    error: problemError,
    isLoading: isLoadingProblem,
  } = useGetProblemByIdQuery(id);

  const {
    data: testCasesData,
    error: testCasesError,
    isLoading: isLoadingTestCases,
  } = useGettestcasebyproblemidQuery(id);
  if (isLoadingProblem || isLoadingTestCases) {
    return (
      <div className="h-screen w-screen ">
        <div className="flex">
          <div className="w-1/4  p-4">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-6 w-16 bg-orange-200 dark:bg-orange-900" />
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-36 " />
            </div>
            <Skeleton className="h-60 w-full rounded-md " />
          </div>
          <div className="w-3/4 ">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
              <Skeleton className="h-9 w-40 bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-24 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-8 w-28 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-8 w-28 bg-gray-300 dark:bg-gray-600" />
                <Skeleton className="h-8 w-32 bg-gray-300 dark:bg-gray-600" />
              </div>
            </div>
            <div className="relative h-[calc(100vh-8.5rem)]">
              <div className="absolute bottom-0 left-0 top-0 flex w-12 flex-col border border-gray-200 dark:border-gray-700 ">
                <Skeleton className="mx-auto mt-2 h-6 w-6 bg-gray-300 dark:bg-gray-600" />
              </div>
              <div className="ml-12 h-full">
                <Skeleton
                  className="h-6 w-full bg-transparent"
                  shimmer={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (problemError || !problem || testCasesError)
    return <p>Error loading problem or not found.</p>;

  const testCases =
    testCasesData?.result.map((testcase: any) => ({
      id: testcase.id,
      problem_id: testcase.problemId,
      input: testcase.inputData,
      expected_output: testcase.expectedOutput,
      is_public: !testcase.isPrivate,
      user_output: "",
      test_case: testcase.inputData,
      passed: false,
    })) || [];

  const mergedProblem = {
    ...dummyProblem,
    id,
    title: problem?.result?.name || dummyProblem.title,
    difficulty: problem?.result?.difficultyLevel || "",
    categories: problem?.result.categories || dummyProblem.categories,
    test_cases: testCases,
  };
  return (
    <Editor
      details={mergedProblem}
      languages={supportCodeLanguage}
      tags={mergedProblem.categories}
      testCases={mergedProblem.test_cases}
    />
  );
}

export default ProblemModule;
