"use client";
import { ViewGridIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Key } from "react";

import { Button } from "@/components/core/common/button";
import { TopicCard } from "@/components/core/common/topic/topic-card";
import { useGetAllProblemsQuery } from "@/store/queries/problem";
import { useGetAllTopicsQuery } from "@/store/queries/topic";
import { SkeletonCard } from "@/components/core/common/skeleton-helper";
import { columnsStudent } from "@/components/core/common/problemTable/columns-student";
import { DataTableStudent } from "@/components/core/common/problemTable/data-table-student";

function PracticeModule() {
  const router = useRouter();
  const { data: topics, isLoading: isLoadingTopics } = useGetAllTopicsQuery({
    pageSize: 3,
    sortField: "createdDate",
    pageIndex: 0,
  });
  return (
    <>
      <div className="mx-8 w-full max-w-7xl flex-1 flex-col space-y-4 p-8 md:flex">
        <div className="flex items-center justify-between space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Topics</h2>
            <p className="text-muted-foreground">
              Join your interesting topic.
            </p>
          </div>
          <Button
            className="ml-auto hidden h-8 lg:flex"
            size="sm"
            variant="outline"
            onClick={() => router.push("practice/topic")}
          >
            <ViewGridIcon className="mr-2 h-4 w-4" />
            View all
          </Button>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {isLoadingTopics
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} className="h-44 rounded-lg" />
              ))
            : topics?.result?.items?.map(
                (contest: unknown, index: Key | null | undefined) => (
                  <TopicCard key={index} isJoined={true} topic={contest} />
                ),
              )}
        </div>
      </div>

      <div className="mx-8 w-full max-w-7xl flex-1 flex-col space-y-4 p-8 md:flex">
        <div className="flex items-center justify-between space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">All Problems</h2>
            <p className="text-muted-foreground">
              Here is the full list of problems on the platform.
            </p>
          </div>
        </div>

        <DataTableStudent columns={columnsStudent} />
      </div>
    </>
  );
}

export default PracticeModule;
