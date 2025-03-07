import { Card, CardContent } from "@/components/core/common/card"
import type { LucideIcon } from "lucide-react"

interface TeacherStatCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  secondaryValue?: string | number
  secondaryLabel?: string
  highlight?: boolean
  trend?: "up" | "down"
}

export function TeacherStatCard({
  title,
  value,
  description,
  icon: Icon,
  secondaryValue,
  secondaryLabel,
  highlight,
  trend,
}: TeacherStatCardProps) {
  return (
    <Card className={highlight ? "border-primary" : ""}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <Icon className="h-5 w-5 text-muted-foreground" />
          {trend && (
            <span className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {trend === "up" ? "↑" : "↓"}
            </span>
          )}
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          {secondaryValue && (
            <div className="mt-2 text-sm text-primary">
              {secondaryValue}{" "}
              {secondaryLabel && <span className="text-xs text-muted-foreground">({secondaryLabel})</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

