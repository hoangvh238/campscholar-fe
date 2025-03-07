import { Separator } from "@/components/core/common/separator"
import { Skeleton } from "@/components/core/common/skeleton"

export function ClassListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <div className="flex">
            {/* Left section */}
            <div className="flex-1 p-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <Separator orientation="vertical" className="h-auto" />

            {/* Right section */}
            <div className="w-80 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>

              <div className="space-y-4 mt-auto">
                <div>
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-1 w-full" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>

                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

