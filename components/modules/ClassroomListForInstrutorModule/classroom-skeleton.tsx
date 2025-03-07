import {  Card, CardContent, CardHeader } from "@/components/core/common/card" 
import { Skeleton } from "@/components/core/common/skeleton"

export function ClassroomSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  )
}

