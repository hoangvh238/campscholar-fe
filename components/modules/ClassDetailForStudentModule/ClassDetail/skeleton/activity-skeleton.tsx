import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import { Skeleton } from "@/components/core/common/skeleton";

export function ActivitySkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex flex-1 flex-col">
                <Skeleton className="h-4 w-3/4" />
                <div className="mt-1 flex items-center gap-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
