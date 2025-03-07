import { ListFilter } from "lucide-react"
import { Button } from "@/components/core/common/button"
import { Skeleton } from "@/components/core/common/skeleton"

export function FilterDropdownSkeleton() {
  return (
    <Button variant="outline" size="sm" className="h-9 relative opacity-70 pointer-events-none">
      <ListFilter className="h-4 w-4 mr-2" />
      <Skeleton className="h-4 w-16" />
    </Button>
  )
}

