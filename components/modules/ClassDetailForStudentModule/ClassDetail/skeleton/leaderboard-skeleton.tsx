import { Card, CardContent, CardHeader } from "@/components/core/common/card";
import { Skeleton } from "@/components/core/common/skeleton";

export function LeaderboardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-2.5 text-sm font-medium">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">Student</div>
            <div className="col-span-3">Problems Solved</div>
            <div className="col-span-3 text-right">Score</div>
          </div>
          <div className="divide-y">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-12 items-center px-4 py-3 text-sm"
              >
                <div className="col-span-1 text-center">
                  <Skeleton className="mx-auto h-5 w-5" />
                </div>
                <div className="col-span-5 flex items-center gap-2 font-medium">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="col-span-3">
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="col-span-3 text-right">
                  <Skeleton className="ml-auto h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
