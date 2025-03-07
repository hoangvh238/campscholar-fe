"use client";

import { Badge } from "@/components/core/common/badge";
import { Button } from "@/components/core/common/button";
import { Progress } from "@/components/core/common/progress";
import { Separator } from "@/components/core/common/separator";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ClassListSkeleton } from "./skeletons/class-list-skeleton";

interface ClassListProps {
  classes: any[];
  isLoading: boolean;
}

export function ClassList({ classes, isLoading }: ClassListProps) {
  const router = useRouter();

  if (isLoading) {
    return <ClassListSkeleton />;
  }

  if (classes.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium">No classes found</h3>
        <p className="mt-1 text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {classes.map((classItem, index) => (
        <motion.div
          key={classItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="overflow-hidden rounded-lg border border-zinc-300 transition-colors duration-300 hover:border-zinc-500 dark:border-zinc-800 dark:hover:border-zinc-700">
            <div className="flex">
              {/* Left section */}
              <div className="flex-1 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      {classItem.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {classItem.courseCode}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{classItem.instructor}</span>
                  </div>

                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {classItem.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{classItem.numberOfTopic} Topics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{classItem.assignments} Assignments</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <Separator orientation="vertical" className="h-auto" />

              {/* Right section */}
              <div className="flex w-80 flex-col p-6">
                <div className="mb-6 flex items-start justify-between">
                  <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-500"
                  >
                    {getSemesterName(classItem.semester)}
                  </Badge>
                </div>

                <div className="mt-auto space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                      <span>Course progress</span>
                      <span>
                        {classItem.progress > 0
                          ? `${classItem.progress.toFixed(2)}%`
                          : "Not started yet"}
                      </span>
                    </div>
                    <Progress
                      value={classItem.progress}
                      className="h-1"
                      indicatorClassName="bg-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(classItem.startDate)} -{" "}
                      {formatDate(classItem.endDate)}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => router.push(`/classrooms/${classItem.id}`)}
                  >
                    Enter Class
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function getSemesterName(semester: string) {
  switch (semester) {
    case "spring2025":
      return "Spring 2025";
    case "summer2025":
      return "Summer 2025";
    case "fall2025":
      return "Fall 2025";
    default:
      return semester;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}
