import { Card, CardContent, CardHeader } from "@/components/core/common/card";
import { Skeleton } from "@/components/core/common/skeleton";

export function TopicSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-1 w-full" />
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
