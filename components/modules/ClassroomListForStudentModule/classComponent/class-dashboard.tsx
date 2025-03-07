"use client";

import { Button } from "@/components/core/common/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/core/common/dropdown-menu";
import { Input } from "@/components/core/common/input";
import { useGetClassesQuery } from "@/store/queries/classroom";
import { AnimatePresence, motion } from "framer-motion";
import { Grid3X3, List, Search, SlidersHorizontal } from "lucide-react";
import { use, useEffect, useState } from "react";
import { ClassCard } from "./class-card";
import { ClassList } from "./class-list";
import { FilterDropdown } from "./filter-dropdown";
import { SemesterSelector } from "./semester-selector";
import { ClassCardSkeleton } from "./skeletons/class-card-skeleton";
import { ClassDashboardSkeleton } from "./skeletons/class-dashboard-skeleton";
import { ClassListSkeleton } from "./skeletons/class-list-skeleton";
import { useSelector } from "react-redux";

export default function ClassDashboard() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
  );
  const userData = useSelector((state: any) => state.user);
  const [userID, setUserId] = useState<string | null>(null);
  
  const getFilteredClasses = () => {
    if (!classes) return [];

    let filteredClasses = [...classes];

    if (selectedSemester !== "all") {
      filteredClasses = filteredClasses.filter(
        (c) => c.semester === selectedSemester,
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredClasses = filteredClasses.filter(
        (c) =>
          c.fullName.toLowerCase().includes(query) ||
          c.courseCode.toLowerCase().includes(query) ||
          c.instructor.toLowerCase().includes(query),
      );
    }

    // Apply active filters
    Object.entries(activeFilters).forEach(([category, options]) => {
      switch (category) {
        case "progress":
          filteredClasses = filteredClasses.filter((c) => {
            if (options.includes("not-started")) return c.progress === 0;
            if (options.includes("in-progress"))
              return c.progress > 0 && c.progress < 100;
            if (options.includes("completed")) return c.progress === 100;
            return true;
          });
          break;
        case "assignments":
          filteredClasses = filteredClasses.filter((c) => {
            if (options.includes("few"))
              return c.assignments >= 1 && c.assignments <= 5;
            if (options.includes("medium"))
              return c.assignments >= 6 && c.assignments <= 10;
            if (options.includes("many")) return c.assignments >= 11;
            return true;
          });
          break;
      }
    });

    if (sortBy === "name") {
      filteredClasses.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (sortBy === "date") {
      filteredClasses.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
    } else if (sortBy === "progress") {
      filteredClasses.sort((a, b) => b.progress - a.progress);
    }

    return filteredClasses;
  };

  const { data: classes = [], isLoading, error } = useGetClassesQuery(userID ?? "");

  const semesterCounts = classes
    ? {
        spring2025: classes.filter((c) => c.semester === "spring2025").length,
        summer2025: classes.filter((c) => c.semester === "summer2025").length,
        fall2025: classes.filter((c) => c.semester === "fall2025").length,
      }
    : { spring2025: 0, summer2025: 0, fall2025: 0 };

  const filteredClasses = getFilteredClasses();

  useEffect(() => {
    if (userData?.userId) {
      setUserId(userData.userId);
    }
  }, [userData]);
  
  if (isLoading) {
    return <ClassDashboardSkeleton />;
  }
  
  if (error) {
    return <div>Error loading classes</div>;
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-1 flex-col">
        <div className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col space-y-6">
              <SemesterSelector
                selectedSemester={selectedSemester}
                onSelectSemester={setSelectedSemester}
                semesterCounts={semesterCounts}
              />

              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="relative w-full md:w-auto md:min-w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search classes..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex w-full items-center justify-end gap-2 md:w-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Sort by
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setSortBy("name")}
                        className={sortBy === "name" ? "bg-muted" : ""}
                      >
                        Course Name
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("date")}
                        className={sortBy === "date" ? "bg-muted" : ""}
                      >
                        Start Date
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("progress")}
                        className={sortBy === "progress" ? "bg-muted" : ""}
                      >
                        Progress
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <FilterDropdown onFilterChange={setActiveFilters} />

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() =>
                      setViewMode(viewMode === "grid" ? "list" : "grid")
                    }
                  >
                    {viewMode === "grid" ? (
                      <List className="h-4 w-4" />
                    ) : (
                      <Grid3X3 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={
                    selectedSemester +
                    sortBy +
                    searchQuery +
                    viewMode +
                    JSON.stringify(activeFilters)
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    viewMode === "grid" ? (
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Array(6)
                          .fill(0)
                          .map((_, i) => (
                            <ClassCardSkeleton key={i} />
                          ))}
                      </div>
                    ) : (
                      <ClassListSkeleton />
                    )
                  ) : filteredClasses.length === 0 ? (
                    <div className="py-12 text-center">
                      <h3 className="text-lg font-medium">No classes found</h3>
                      <p className="mt-1 text-muted-foreground">
                        Try adjusting your filters or search query
                      </p>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredClasses.map((classItem, index) => (
                        <motion.div
                          key={classItem.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.05 },
                          }}
                        >
                          <ClassCard classData={classItem} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <ClassList
                      classes={filteredClasses}
                      isLoading={isLoading}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
