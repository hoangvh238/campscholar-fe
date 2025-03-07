import { Card, CardContent, CardFooter } from "@/components/core/common/card"
import { Skeleton } from "@/components/core/common/skeleton"

export function ClassCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden border shadow-sm">
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 p-4">
        <div className="mb-3 flex items-start justify-between">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-7 w-full mb-2" />
        <Skeleton className="h-7 w-3/4" />
        <div className="mt-2 flex items-center">
          <Skeleton className="h-4 w-4 rounded-full mr-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <CardContent className="flex flex-grow flex-col p-4">
        <div className="mb-4 grid flex-shrink-0 grid-cols-2 gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="mt-auto">
          <div className="mb-2 mt-2">
            <div className="mb-1.5 flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex justify-between gap-2 border-t p-4 pt-3">
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  )
}

