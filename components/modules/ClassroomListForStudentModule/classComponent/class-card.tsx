"use client";
import { Badge } from "@/components/core/common/badge";
import { Button } from "@/components/core/common/button";
import { Card, CardContent, CardFooter } from "@/components/core/common/card";
import { Progress } from "@/components/core/common/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/core/common/tooltip";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  ChevronRight,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ClassCardProps {
  classData: {
    id: string;
    name: string;
    courseCode: string;
    fullName: string;
    instructor: string;
    semester: string;
    startDate: string;
    endDate: string;
    assignments: number;
    progress: number;
    color: string;
    totalStudent: number;
    numberOfTopic: number;
  };
}

export function ClassCard({ classData }: ClassCardProps) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    teal: "from-teal-500 to-teal-600",
    amber: "from-amber-500 to-amber-600",
    indigo: "from-indigo-500 to-indigo-600",
    pink: "from-pink-500 to-pink-600",
    cyan: "from-cyan-500 to-cyan-600",
  };

  const lightColorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30",
    green:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/30",
    purple:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30",
    orange:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800/30",
    red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30",
    teal: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800/30",
    amber:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30",
    indigo:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/30",
    pink: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800/30",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800/30",
  };

  const progressColorMap: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    teal: "bg-teal-500",
    amber: "bg-amber-500",
    indigo: "bg-indigo-500",
    pink: "bg-pink-500",
    cyan: "bg-cyan-500",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getSemesterName = (semester: string) => {
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
  };

  const router = useRouter();

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <Card className="flex h-full flex-col overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md">
          {/* Card Header with Gradient */}
          <div
            className={`bg-gradient-to-r ${colorMap[classData.color] || colorMap.blue} p-4 text-white`}
          >
            <div className="mb-3 flex items-start justify-between">
              <Badge
                variant="outline"
                className="border-white/30 bg-white/20 font-medium text-white backdrop-blur-sm"
              >
                {classData.courseCode}
              </Badge>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className="border-white/30 bg-white/20 text-white backdrop-blur-sm"
                  >
                    {getSemesterName(classData.semester)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {formatDate(classData.startDate)} -{" "}
                    {formatDate(classData.endDate)}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold">
              {classData.fullName}
            </h3>
            <div className="mt-2 flex items-center text-sm text-white/90">
              <GraduationCap className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{classData.instructor}</span>
            </div>
          </div>

          <CardContent className="flex flex-grow flex-col p-4">
            <div className="mb-4 grid flex-shrink-0 grid-cols-2 gap-2 text-sm">
              <div
                className={`flex items-center rounded-md p-2 ${lightColorMap[classData.color] || lightColorMap.blue} border`}
              >
                <MapPin className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{classData.totalStudent}</span>
              </div>
              <div
                className={`flex items-center rounded-md p-2 ${lightColorMap[classData.color] || lightColorMap.blue} border`}
              >
                <Award className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                <span>{classData.numberOfTopic} Topics</span>
              </div>
            </div>

            <div className="mt-auto">
              <div className="mb-2 mt-2">
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium">Solved progress</span>
                  <span className="font-medium">{classData.progress.toFixed(2)}%</span>
                </div>
                <Progress
                  value={classData.progress}
                  className="h-2"
                  indicatorClassName={
                    progressColorMap[classData.color] || progressColorMap.blue
                  }
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-auto flex justify-between gap-2 border-t p-4 pt-3">
            <Button variant="outline" size="sm" className="flex-1 gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="ml-1">Materials</span>
            </Button>
            <Button
              onClick={() => router.push(`/classrooms/${classData.id}`)}
              size="sm"
              className="flex-1 gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            >
              <span>Enter</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}
