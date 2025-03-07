"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/core/common/button";
import {
  Plus,
  Search,
  ChevronDown,
  MoreVertical,
  Filter,
  BarChart,
  Users,
  ArrowUpDown,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/core/common/input";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/core/common/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/common/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/core/common/card";
import { ClassroomSkeleton } from "./classroom-skeleton";
import Link from "next/link";
import { Progress } from "@/components/core/common/progress";
import { useGetListClassByInstructorQuery } from "@/store/queries/instructor-classroom";
import { useRouter } from "next/navigation";
import { useSelector, UseSelector } from "react-redux";
import { useCreateOrUpdateClassroomMutation } from "@/store/queries/classroom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/core/common/dialog";
interface Classroom {
  id: string;
  name: string;
  semester: string;
  startDate: string;
  totalStudent: number;
  numberOfTopic: number;
  progress: number;
  instructorName: string | null;
  totalProblem: number;
}

const isLoading = false;

export default function ClassroomModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [className, setClassName] = useState("");
  const router = useRouter();

  const [createClassroom, { isLoading: isCreating }] = useCreateOrUpdateClassroomMutation();

  const instructorId = useSelector((state :any) => state.user.userId);

  const { data, isLoading, error, refetch } = useGetListClassByInstructorQuery(instructorId, {
    skip: !instructorId,
  });

  const classrooms = data?.result ?? []; 
 
  const handleCreateClassroom = async () => {
    if (!className.trim()) return;
    try {
      await createClassroom({ name: className }).unwrap();
      setClassName("");
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Failed to create classroom", error);
    }
  };
 
  if (error)
    return (
      <div className="text-orange-600">
        Error loading classrooms. Please try again.
      </div>
    );

  const filteredAndSortedClassrooms = Array.isArray(classrooms)
    ? classrooms
        .filter((classroom: Classroom) => {
          if (filterBy === "all") return true;
          if (filterBy === "high") return classroom.progress >= 50;
          if (filterBy === "medium")
            return classroom.progress >= 25 && classroom.progress < 50;
          if (filterBy === "low") return classroom.progress < 25;
          return true;
        })
        .filter((classroom: Classroom) =>
          classroom.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a: Classroom, b: Classroom) => {
          if (sortBy === "name") return a.name.localeCompare(b.name);
          if (sortBy === "students") return b.totalStudent - a.totalStudent;
          if (sortBy === "progress") return b.progress - a.progress;
          return 0;
        })
    : [];

  return (
    <div className="container mx-8 flex w-full max-w-7xl flex-col gap-6 p-8">
      <motion.div
        className="mb-6 flex flex-col items-center justify-between md:flex-row"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-3xl font-bold md:mb-0">Classrooms</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Classroom</span>
        </Button>
      </motion.div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Classroom</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter classroom name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateClassroom} disabled={isCreating}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <motion.div
        className="mb-6 flex flex-col gap-4 md:flex-row"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            placeholder="Search classrooms..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex w-[120px] items-center gap-2"
              >
                Sort by <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setSortBy("name")}
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                Name
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("students")}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4 text-muted-foreground" />
                Students
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("progress")}
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4 text-muted-foreground" />
                Progress
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filter by progress" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Progress</SelectItem>
              <SelectItem value="high">High (≥50%)</SelectItem>
              <SelectItem value="medium">Medium (25-49%)</SelectItem>
              <SelectItem value="low">Low (&lt;25%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ClassroomSkeleton key={index} />
            ))
          : filteredAndSortedClassrooms?.map((classroom: Classroom) => (
              <motion.div
                key={classroom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/administration/classrooms/manage/${classroom.id}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <CardTitle>{classroom.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Students: {classroom.totalStudent}</span>
                        <span>Topics: {classroom.numberOfTopic}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Problems: {classroom.totalProblem}</span>
                        <span>Semester: {classroom.semester}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">
                            {classroom.progress.toFixed(2)}%
                          </span>
                        </div>
                        <Progress
                          value={classroom.progress}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4 pt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Classroom</DropdownMenuItem>
                          <DropdownMenuItem>Manage Students</DropdownMenuItem>
                          <DropdownMenuItem>Create Assignment</DropdownMenuItem>
                          <DropdownMenuItem>Export Data</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            Archive Classroom
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}
