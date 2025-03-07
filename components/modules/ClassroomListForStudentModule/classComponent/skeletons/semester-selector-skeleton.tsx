import { Calendar } from "lucide-react"
import { Badge } from "@/components/core/common/badge"
import { Button } from "@/components/core/common/button"
import { Card, CardContent } from "@/components/core/common/card"
import { Skeleton } from "@/components/core/common/skeleton"

export function SemesterSelectorSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Button variant="outline" className="gap-1 opacity-70 pointer-events-none">
          <Calendar className="h-4 w-4" />
          All Semesters
          <Badge variant="secondary" className="ml-1">
            <Skeleton className="h-4 w-4" />
          </Badge>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="overflow-hidden border-2 border-transparent">
            <div className={`bg-gradient-to-r from-gray-300 to-gray-400 p-4`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

