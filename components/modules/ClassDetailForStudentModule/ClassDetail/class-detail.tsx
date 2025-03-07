"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/core/common/avatar";
import { Badge } from "@/components/core/common/badge";
import { Button } from "@/components/core/common/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import { Progress } from "@/components/core/common/progress";
import { Separator } from "@/components/core/common/separator";
import { Skeleton } from "@/components/core/common/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/core/common/tabs";
import {
  useGetActivityQuery,
  useGetClassDetailQuery,
  useGetLeaderboardQuery,
  useGetProblemsQuery,
  useGetTopicsQuery,
} from "@/store/queries/classroom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Code,
  FileText,
  Trophy,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ActivitySkeleton } from "./skeleton/activity-skeleton";
import { skip } from "node:test";

export default function ClassDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const userData = useSelector((state: any) => state.user);
  const [userID, setUserId] = useState<string | null>(null);

  const { data: classData, isLoading: isLoadingClass } = useGetClassDetailQuery(
    { classId: params.id ?? "", studentId: userID ?? "" },
    {
      skip: !userID
    }
  );
  
  const { data: topics, isLoading: isLoadingTopics } = useGetTopicsQuery({
    classId: params.id ?? "",
    studentId: userID ?? "",
  },
  {
    skip: !userID
  });
  
  const { data: leaderboard, isLoading: isLoadingLeaderboard } =
    useGetLeaderboardQuery(params.id);
  const { data: activity, isLoading: isLoadingActivity } = useGetActivityQuery(
    params.id,
  );
  const { data: problems, isLoading: isLoadingProblem } = useGetProblemsQuery({
    classId: params.id,
  });
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "Solved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in-progress":
      case "Attempted":
        return <Circle className="h-5 w-5 fill-amber-500/30 text-amber-500" />;
      case "not-started":
      case "Todo":
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusIconBoolType = (status: boolean) => {
    switch (status) {
      case true:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  let currentUser = leaderboard?.find((user) => user.id === userID);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "Solved":
        return (
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700"
          >
            Completed
          </Badge>
        );
      case "in-progress":
      case "Attempted":
        return (
          <Badge
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700"
          >
            In Progress
          </Badge>
        );
      case "not-started":
      case "Todo":
        return (
          <Badge
            variant="outline"
            className="border-slate-200 bg-slate-50 text-slate-700"
          >
            Not Started
          </Badge>
        );
      case "overdue":
        return (
          <Badge
            variant="outline"
            className="border-red-200 bg-red-50 text-red-700"
          >
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return <Badge className="bg-green-500">Easy</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "hard":
        return <Badge className="bg-red-500">Hard</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getDifficultyBadgeNumType = (difficulty: number) => {
    switch (difficulty) {
      case 0:
        return <Badge className="bg-green-500">Easy</Badge>;
      case 1:
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 2:
        return <Badge className="bg-red-500">Hard</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "problem-solved":
        return <Code className="h-5 w-5 text-blue-500" />;
      case "achievement":
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case "streak":
        return <BarChart3 className="h-5 w-5 text-green-500" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      setUserId(userData.userId);
    }
  }, [userData]);

  if (
    isLoadingClass ||
    isLoadingTopics ||
    isLoadingLeaderboard ||
    isLoadingActivity
  ) {
    return <LoadingSkeleton />;
  }

  if (!classData || !topics || !leaderboard || !activity) {
    return <div>Error loading data</div>;
  }
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col">
        <div className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-6"
            >
              {/* Header with back button */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Classes
                </Button>
              </div>

              {/* Class header with title and progress */}
              <Card className="w-full">
                <CardHeader>
                  <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex flex-col">
                      <h1 className="text-3xl font-bold tracking-tight">
                        {classData.name}
                      </h1>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-sm font-medium"
                        >
                          {classData.courseCode} 
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-sm font-medium"
                        >
                          {classData.semester}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="hidden items-center gap-2 md:flex"
                    >
                      <FileText className="h-4 w-4" />
                      Course Syllabus
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Instructor</p>
                        <p className="text-sm text-muted-foreground">
                          {classData.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(classData.startDate)} -{" "}
                          {formatDate(classData.endDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Problems</p>
                        <p className="text-sm text-muted-foreground">
                          {classData.assignments} Problems
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Topics</p>
                        <p className="text-sm text-muted-foreground">
                          {classData.numberOfTopic} Topics
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                    {classData.progress?.toFixed(2)}% Complete
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(
                        classData.assignments * (classData.progress / 100),
                      )}{" "}
                      / {classData.assignments} Problems
                    </span>
                  </div>
                  <Progress value={classData.progress} className="h-2" />
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">
                        {classData.assignments}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Total Problems
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">
                      {topics.reduce((acc, topic) => acc + topic.completedProblems, 0)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Solved
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">
                        {classData.numberOfTopic}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Topics
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Tabs for different sections */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 md:inline-flex md:w-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="topics">Topic Set</TabsTrigger>
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {isLoadingActivity ? (
                      <ActivitySkeleton />
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle>Your Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <AnimatePresence>
                              {activity.map((activityItem, i) => (
                                <motion.div
                                  key={activityItem.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                    {getActivityIcon(activityItem.type)}
                                  </div>
                                  <div className="flex flex-col">
                                    {activityItem.type === "problem-solved" && (
                                      <span className="font-medium">
                                        Solved{" "}
                                        <span className="text-primary">
                                          {activityItem.problemName}
                                        </span>{" "}
                                        in {activityItem.topicName}
                                      </span>
                                    )}
                                    {activityItem.type === "achievement" && (
                                      <span className="font-medium">
                                        Earned achievement:{" "}
                                        <span className="text-amber-500">
                                          {activityItem.achievementName}
                                        </span>
                                      </span>
                                    )}
                                    {activityItem.type === "streak" && (
                                      <span className="font-medium">
                                        Maintained a{" "}
                                        <span className="text-green-500">
                                          {activityItem.days}-day
                                        </span>{" "}
                                        streak
                                      </span>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <span>
                                        {formatTimeAgo(activityItem.timestamp)}
                                      </span>
                                      <span>•</span>
                                      <span>+{activityItem.points} points</span>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {isLoadingTopics ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Topic Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <Skeleton className="h-4 w-24" />
                                  <Skeleton className="h-4 w-12" />
                                </div>
                                <Skeleton className="h-2 w-full" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle>Topic Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <AnimatePresence>
                              {topics.map((topic, i) => (
                                <motion.div
                                  key={topic.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="space-y-1"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      {topic.title}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      {Math.round(
                                        (topic.completedProblems /
                                          topic.totalProblems) *
                                          100,
                                      )}
                                      %
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      (topic.completedProblems /
                                        topic.totalProblems) *
                                      100
                                    }
                                    className="h-1.5"
                                  />
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="topics" className="mt-6">
                  <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence>
                      {topics.map((topic, i) => (
                        <motion.div
                          key={topic.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Card className="overflow-hidden">
                            <div
                              className={`h-1 ${
                                topic.status === "completed"
                                  ? "bg-green-500"
                                  : topic.status === "in-progress"
                                    ? "bg-amber-500"
                                    : "bg-slate-200"
                              }`}
                            />
                            <CardHeader className="pb-2">
                              <div
                                className="flex cursor-pointer items-start justify-between"
                                onClick={() =>
                                  setExpandedTopicId(
                                    expandedTopicId === topic.id
                                      ? null
                                      : topic.id,
                                  )
                                }
                              >
                                <div className="space-y-1">
                                  <CardTitle className="flex items-center gap-2">
                                    {expandedTopicId === topic.id ? (
                                      <ChevronDown className="h-5 w-5" />
                                    ) : (
                                      <ChevronRight className="h-5 w-5" />
                                    )}
                                    {topic.title}
                                  </CardTitle>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getDifficultyBadge(topic.difficulty)}
                                  {getStatusBadge(topic.status)}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="font-medium">
                                      {topic.completedProblems} of{" "}
                                      {topic.totalProblems} Problems
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      (topic.completedProblems /
                                        topic.totalProblems) *
                                      100
                                    }
                                    className="h-2"
                                  />
                                </div>
                              </div>
                              <AnimatePresence>
                                {expandedTopicId === topic.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 space-y-2"
                                  >
                                    <AnimatePresence>
                                      {expandedTopicId === topic.id && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{
                                            height: "auto",
                                            opacity: 1,
                                          }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="mt-4 space-y-2"
                                        >
                                          {topic?.problems?.map((problem) => (
                                            <div
                                              key={problem.problemId}
                                              className="flex items-center justify-between"
                                            >
                                              <div className="flex items-center gap-2">
                                                {getStatusIconBoolType(
                                                  problem?.isSolved,
                                                )}
                                                <span>{problem.problemName}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                {getDifficultyBadgeNumType(
                                                  problem?.difficulty,
                                                )}
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() =>
                                                    router.replace(`/practice/problem/${problem.problemId}`)}
                                                >
                                                  {problem?.isSolved ===
                                                  true
                                                    ? "Review"
                                                    : "Solve"}
                                                </Button>
                                              </div>
                                            </div>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </TabsContent>

                <TabsContent value="leaderboard" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Class Leaderboard</CardTitle>
                        <Badge
                          variant="outline"
                          className="border-blue-200 bg-blue-50 text-blue-700"
                        >
                          Your Rank: {currentUser?.rank}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-2.5 text-sm font-medium">
                          <div className="col-span-1 text-center">#</div>
                          <div className="col-span-5">Student</div>
                          <div className="col-span-3">Problems Solved</div>
                          <div className="col-span-3 text-right">Score</div>
                        </div>
                        <div className="divide-y">
                          <AnimatePresence>
                            {leaderboard.map((student, i) => (
                              <motion.div
                                key={student.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`grid grid-cols-12 items-center px-4 py-3 text-sm ${student.rank === currentUser?.rank ? "bg-blue-50" : ""}`}
                              >
                                <div className="col-span-1 text-center font-bold">
                                  {student.rank <= 3 ? (
                                    <span
                                      className={
                                        student.rank === 1
                                          ? "text-amber-500"
                                          : student.rank === 2
                                            ? "text-slate-400"
                                            : "text-amber-700"
                                      }
                                    >
                                      {student.rank}
                                    </span>
                                  ) : (
                                    <span>{student.rank}</span>
                                  )}
                                </div>
                                <div className="col-span-5 flex items-center gap-2 font-medium">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={student.avatar}
                                      alt={student.name}
                                    />
                                    <AvatarFallback>
                                      {student.name.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {student.name}
                                  {student.rank === currentUser?.rank && (
                                    <Badge
                                      variant="outline"
                                      size="sm"
                                      className="ml-2 text-xs"
                                    >
                                      You
                                    </Badge>
                                  )}
                                </div>
                                <div className="col-span-3">
                                  {student.solvedProblems} /{" "}
                                  {classData.assignments}
                                </div>
                                <div className="col-span-3 text-right font-bold">
                                  {currentUser?.score} pts
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col">
        <div className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col space-y-6">
              <Skeleton className="h-10 w-32" />
              <Card className="w-full">
                <CardHeader>
                  <Skeleton className="h-8 w-64" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="mt-1 h-4 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="mb-4 h-2 w-full" />
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="mt-1 h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Skeleton className="h-10 w-full" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Skeleton className="h-9 w-9 rounded-full" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="mt-1 h-3 w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-12" />
                          </div>
                          <Skeleton className="h-2 w-full" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
