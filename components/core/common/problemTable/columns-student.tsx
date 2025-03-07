"use client";

import { Badge } from "@/components/core/common/badge";
import { DataTableColumnHeaderInstructor } from "@/components/core/common/problemTable/data-table-column-header-instructor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/core/common/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { CheckCircle, Circle } from "lucide-react";

export const columnsStudent: ColumnDef<any>[] = [
  {
    accessorKey: "resolvedStatus",
    header: ({ column }) => (
      <DataTableColumnHeaderInstructor
        column={column}
        title="Status"
        type="multiselect"
        disableSorting={true}
        options={[
          { label: "Not Attempted", value: "NotAttempted" },
          { label: "Solved", value: "Solved" },
          { label: "Attempted", value: "Attempted" },
        ]}
      />
    ),
      cell
    : (
    row
    ) =>
    {
      const status = row.getValue() as string
      return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  {status === "Solved" ? (
                    <div className="flex h-5 w-5 items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-500 transition-colors duration-150" />
                    </div>
                  ) : status === "Attempted" ? (
                    <div className="flex h-5 w-5 items-center justify-center">
                      <div className="relative">
                        <Circle className="h-4 w-4 stroke-2 text-yellow-500 transition-colors duration-150" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-1 w-1 rounded-full bg-yellow-500" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center">
                      <Circle className="h-4 w-4 stroke-[1.5] text-muted-foreground/50 transition-colors duration-150" />
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="flex items-center space-x-1 rounded-md bg-secondary px-2 py-1.5"
              >
                <span className="text-xs font-medium">
                  {status === "NotAttempted" ? "Not Attempted" : status}
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
    ,
      enableHiding: true,
      enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeaderInstructor
        column={column}
        title="Name"
        type="text"
      />
    ),
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate font-medium">
        {row.getValue("name")}
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "difficultyLevel",
    header: ({ column }) => (
      <DataTableColumnHeaderInstructor
        column={column}
        title="Difficulty"
        type="multiselect"
        options={[
          { label: "Easy", value: "Easy" },
          { label: "Medium", value: "Medium" },
          { label: "Normal", value: "Normal" },
          { label: "Hard", value: "Hard" },
        ]}
      />
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue("difficultyLevel") as string;
      return (
        <Badge
          variant="outline"
          className={
            difficulty === "Hard"
              ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
              : difficulty === "Medium" || difficulty === "Normal"
                ? "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                : "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          }
        >
          {difficulty}
        </Badge>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "point",
    header: ({ column }) => (
      <DataTableColumnHeaderInstructor
        column={column}
        title="Points"
        type="number"
        minValue={0}
        maxValue={100}
      />
    ),
    cell: ({ row }) => {
      const points = row.getValue("point") as number;
      return (
        <div className="font-medium">
          <Badge variant="secondary" className="font-medium">
            {points} pts
          </Badge>
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeaderInstructor
        column={column}
        title="Categories"
        type="multiselect"
        disableSorting={true}
        options={[
          { label: "Backtracking", value: "Backtracking" },
          {
            label: "Artificial Intelligence",
            value: "Artificial Intelligence",
          },
          { label: "Bit Manipulation", value: "Bit Manipulation" },
          { label: "Dynamic Programming", value: "Dynamic Programming" },
          { label: "Cyber Security", value: "Cyber Security" },
          { label: "Blockchain Technology", value: "Blockchain Technology" },
          {
            label: "Competitive Programming",
            value: "Competitive Programming",
          },
        ]}
      />
    ),
    cell: ({ row }) => {
      const categories = row.getValue("categories") as { name: string }[];

      // Create a single string with all categories
      const allCategories = categories.map((cat) => cat.name).join(", ");

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[200px] truncate">
                {categories.length > 0 ? (
                  <span className="text-sm">{allCategories}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No categories
                  </span>
                )}
              </div>
            </TooltipTrigger>
            {categories.length > 0 && (
              <TooltipContent className="max-w-[300px]">
                <div className="flex flex-wrap gap-1">
                  {categories.map((cat) => (
                    <Badge
                      key={cat.name}
                      variant="secondary"
                      className="px-1.5 py-0.5 text-xs"
                    >
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      );
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: "updatedDate",
    header: ({ column }) => (
      <DataTableColumnHeaderInstructor
        column={column}
        title="Updated"
        type="date"
      />
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue("updatedDate") as string;
      const date = parseISO(dateStr); 
      
      return (
        <div className="text-sm font-medium text-muted-foreground">
          {format(date, "dd MMM yyyy")}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
    enableColumnFilter: false,
    enableSorting: false,
    size: 0,
    meta: { hidden: true },
  },
];
