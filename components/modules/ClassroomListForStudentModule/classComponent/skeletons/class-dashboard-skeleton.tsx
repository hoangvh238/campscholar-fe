import { Search, SlidersHorizontal, Grid3X3 } from "lucide-react"
import { Button } from "@/components/core/common/button"
import { Input } from "@/components/core/common/input"
import { Skeleton } from "@/components/core/common/skeleton"

import { ClassCardSkeleton } from "./class-card-skeleton"
import { SemesterSelectorSkeleton } from "./semester-selector-skeleton"
import { FilterDropdownSkeleton } from "./filter-dropdown-skeleton"

export function ClassDashboardSkeleton() {
  return (
    <div className="flex w-full">
      <div className="flex-1 flex flex-col">
        <div className="p-4 md:p-6 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-6">
              <SemesterSelectorSkeleton />

              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="relative w-full md:w-auto md:min-w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search classes..." className="pl-8 w-full opacity-70" disabled />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <Button variant="outline" size="sm" className="h-9 opacity-70 pointer-events-none">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 w-16" />
                  </Button>

                  <FilterDropdownSkeleton />

                  <Button variant="outline" size="icon" className="h-9 w-9 opacity-70 pointer-events-none">
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <ClassCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

