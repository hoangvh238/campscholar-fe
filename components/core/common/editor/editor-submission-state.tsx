import { cn } from "@/utils/cn";

export function SubmissionState({ submission }: { submission: any }) {
  const executeResultList = submission;

  let totalTime = 0;
  let count = 0;
  let isFailed = false;
  for (const key in executeResultList) {
    if (executeResultList.hasOwnProperty(key)) {
      const result = executeResultList[key];
      totalTime += result.execution_time || 0;
      count++;
      if (result.passed === false) {
        isFailed = true;
      }
    }
  }

  const averageTime = totalTime / count;
  const parsedStatus = isFailed ? "Failed" : "Passed";
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p
            className={cn("text-lg font-semibold", {
              "text-green-500": parsedStatus === "Passed",
              "text-red-500": parsedStatus === "Failed",
            })}
          >
            {parsedStatus}
          </p>
        </div>
        <div className="ml-2 mt-1 flex gap-1 self-center">
          <p className="text-xs">Runtime:</p>
          <p className="text-xs">{averageTime?.toFixed(4)} ms</p>
        </div>
      </div>
    </>
  );
}
