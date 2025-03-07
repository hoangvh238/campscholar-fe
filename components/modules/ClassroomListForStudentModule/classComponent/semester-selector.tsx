"use client"

import { motion } from "framer-motion"
import { Calendar, ChevronRight } from "lucide-react"
import { Badge } from "@/components/core/common/badge"
import { Button } from "@/components/core/common/button"
import { Card, CardContent } from "@/components/core/common/card"

interface SemesterSelectorProps {
  selectedSemester: string
  onSelectSemester: (semester: string) => void
  semesterCounts: {
    spring2025: number
    summer2025: number
    fall2025: number
  }
}

export function SemesterSelector({ selectedSemester, onSelectSemester, semesterCounts }: SemesterSelectorProps) {
  const semesters = [
    {
      id: "spring2025",
      name: "Spring 2025",
      period: "Jan - Apr",
      icon: "🌱",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
      textColor: "text-emerald-800 dark:text-emerald-300",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-teal-600",
      count: semesterCounts.spring2025,
    },
    {
      id: "summer2025",
      name: "Summer 2025",
      period: "May - Aug",
      icon: "☀️",
      color: "bg-amber-100 dark:bg-amber-900/30",
      textColor: "text-amber-800 dark:text-amber-300",
      borderColor: "border-amber-200 dark:border-amber-800",
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-600",
      count: semesterCounts.summer2025,
    },
    {
      id: "fall2025",
      name: "Fall 2025",
      period: "Sep - Dec",
      icon: "🍂",
      color: "bg-red-100 dark:bg-red-900/30",
      textColor: "text-red-800 dark:text-red-300",
      borderColor: "border-red-200 dark:border-red-800",
      gradientFrom: "from-red-500",
      gradientTo: "to-rose-600",
      count: semesterCounts.fall2025,
    },
  ]

  const totalClasses = Object.values(semesterCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">My Classes</h2>
        <Button
          variant={selectedSemester === "all" ? "default" : "outline"}
          onClick={() => onSelectSemester("all")}
          className="gap-1"
        >
          <Calendar className="h-4 w-4" />
          All Semesters
          <Badge variant="secondary" className="ml-1">
            {totalClasses}
          </Badge>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {semesters.map((semester) => (
          <motion.div
            key={semester.id}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                selectedSemester === semester.id
                  ? `${semester.borderColor} shadow-md`
                  : "border-transparent hover:border-border"
              }`}
              onClick={() => onSelectSemester(semester.id)}
            >
              <div className={`bg-gradient-to-r ${semester.gradientFrom} ${semester.gradientTo} text-white p-4`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{semester.icon}</span>
                    <h3 className="font-bold text-lg">{semester.name}</h3>
                  </div>
                  {selectedSemester === semester.id && (
                    <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                      Selected
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{semester.period}</p>
                  <p className="font-medium">{semester.count} Classes</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

