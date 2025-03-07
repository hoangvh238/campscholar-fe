"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import { Users, BookOpen, Edit2, MoreVertical } from "lucide-react";
import { PerformanceChart } from "./performance-chart";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/core/common/dropdown-menu";
import { Button } from "@/components/core/common/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/core/common/dialog";
import { Input } from "@/components/core/common/input";
import { useCreateOrUpdateClassroomMutation } from "@/store/queries/classroom";
import {
  useGetClassroomWithTopicsByIdQuery,
  useGetClassroomWithStudentsPerformanceByIdQuery,
} from "@/store/queries/instructor-classroom";

interface Topic {
  id: string;
  name: string;
  numberOfProblems: number;
  problems: any[];
  authorId: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
}

interface Classroom {
  id: string;
  name: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  topics?: Topic[];
  totalSolvedProblems?: number;
  totalAttemptedProblems?: number;
  totalNotAttemptedProblems?: number;
}

export default function ManageTopics({
  classroomId,
  onUpdateSuccess,
}: {
  classroomId: string;
  onUpdateSuccess: () => void;
}) {
  const { data: topicsData, isLoading: topicsLoading } =
    useGetClassroomWithTopicsByIdQuery(classroomId);

  const { data: performanceData, isLoading: performanceLoading } =
    useGetClassroomWithStudentsPerformanceByIdQuery(classroomId);

  const classroom: Classroom = {
    ...topicsData?.result,
    ...performanceData?.result,
  };

  const [className, setClassName] = useState(classroom.name || "");
  const [editName, setEditName] = useState(classroom.name || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateClassroom, { isLoading, error }] =
    useCreateOrUpdateClassroomMutation();

  const handleSaveName = async () => {
    try {
      const updatedData = {
        id: classroom.id,
        name: editName,
      };

      await updateClassroom(updatedData).unwrap();
      setClassName(editName);
      setIsDialogOpen(false);
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (err) {
      console.error("Failed to update classroom name:", err);
      alert("Error updating class name. Please try again!");
    }
  };

  const handleViewTopic = (topicId: number) => {
    // Implement view logic here
    console.log(`Viewing topic ${topicId}`);
    // You might want to navigate to a detailed view of the topic
    // or open a modal with more information
  };

  const handleEditTopic = (topicId: number) => {
    // Implement edit logic here
    console.log(`Editing topic ${topicId}`);
    // You might want to open a modal or navigate to an edit page
  };

  const handleDeleteTopic = (topicId: number) => {
    // Implement delete logic here
    console.log(`Deleting topic ${topicId}`);
    // You might want to show a confirmation dialog before deleting
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Course Topics</CardTitle>
              <CardDescription>
                Click on a topic to view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicsLoading ? (
                  <p>Loading topics...</p>
                ) : (
                  classroom.topics?.map((topic) => (
                    <Card key={topic.id} className="border border-muted">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/classroom/${classroom.id}/topic/${topic.id}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {topic.name}
                          </Link>
                          <div className="flex items-center space-x-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() =>
                                    console.log(`Viewing topic ${topic.id}`)
                                  }
                                >
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() =>
                                    console.log(`Editing topic ${topic.id}`)
                                  }
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() =>
                                    console.log(`Deleting topic ${topic.id}`)
                                  }
                                  className="text-orange-600"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="mb-2 text-sm text-muted-foreground">
                          {topic.numberOfProblems} Problems
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{classroom.name}</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Class Name</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Enter new class name"
                      />
                      <Button onClick={handleSaveName} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>Classroom Performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  Total Solved Problems: {classroom.totalSolvedProblems ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>
                  Total Attempted Problems:{" "}
                  {classroom.totalAttemptedProblems ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>
                  Total Not Attempted Problems:{" "}
                  {classroom.totalNotAttemptedProblems ?? 0}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Overall class progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PerformanceChart
                  data={{
                    totalSolvedProblems: classroom.totalSolvedProblems ?? 0,
                    totalAttemptedProblems:
                      classroom.totalAttemptedProblems ?? 0,
                    totalNotAttemptedProblems:
                      classroom.totalNotAttemptedProblems ?? 0,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
