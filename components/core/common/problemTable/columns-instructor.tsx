"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { format, parseISO } from "date-fns";
import { Code, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";


import { Badge } from "@/components/core/common/badge";
import { Button } from "@/components/core/common/button";
import { Checkbox } from "@/components/core/common/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/core/common/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/core/common/dropdown-menu";
import { DataTableColumnHeaderInstructor } from "@/components/core/common/problemTable/data-table-column-header-instructor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/core/common/tooltip";
import {
  useDeleteProblemByIdMutation,
  useGetAllProblemsQuery,
} from "@/store/queries/problem";
import { toast } from "sonner";

export const columnsInstructor: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
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
        options={[
          { label: "Easy", value: "Easy" },
          { label: "Medium", value: "Medium" },
          { label: "Normal", value: "Normal" },
          { label: "Hard", value: "Hard" },
        ]}
        title="Difficulty"
        type="multiselect"
      />
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue("difficultyLevel") as string;
      return (
        <Badge
          className={
            difficulty === "Hard"
              ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
              : difficulty === "Medium" || difficulty === "Normal"
                ? "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                : "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          }
          variant="outline"
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
        maxValue={100}
        minValue={0}
        title="Points"
        type="number"
      />
    ),
    cell: ({ row }) => {
      const points = row.getValue("point") as number;
      return (
        <div className="font-medium">
          <Badge className="font-medium" variant="secondary">
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
        title="Categories"
        type="multiselect"
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
                      className="px-1.5 py-0.5 text-xs"
                      variant="secondary"
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
  },
  {
    accessorKey: "resolvedStatus",
    header: ({ column }) => (
      <DataTableColumnHeaderInstructor
        column={column}
        disableSorting={true}
        options={[
          { label: "Not Attempted", value: "NotAttempted" },
          { label: "Solved", value: "Solved" },
          { label: "Attempted", value: "Attempted" },
        ]}
        title="Status"
        type="multiselect"
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue("resolvedStatus") as string;
      return (
        <Badge
          className={
            status === "Solved"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : status === "Attempted"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
          }
          variant={
            status === "Solved"
              ? "success"
              : status === "Attempted"
                ? "warning"
                : "outline"
          }
        >
          {status === "NotAttempted" ? "Not Attempted" : status}
        </Badge>
      );
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: "codeTemplate",
    header: ({ column }) => (
      <DataTableColumnHeaderInstructor
        column={column}
        disableSorting={true}
        options={[
          { label: "Available", value: "available" },
          { label: "Not Available", value: "not_available" },
        ]}
        title="Template"
        type="multiselect"
      />
    ),
    cell: ({ row }) => {
      const codeTemplate = row.getValue("codeTemplate") as string | null;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                {codeTemplate ? (
                  <Badge
                    className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-100"
                    variant="outline"
                  >
                    <Code className="mr-1 h-3 w-3" />
                    Available
                  </Badge>
                ) : (
                  <Badge
                    className="border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    variant="outline"
                  >
                    None
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {codeTemplate ? "Code template available" : "No code template"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    enableHiding: true,
    enableSorting: false,
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
  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

const ActionCell = ({ row }: { row: any }) => {
  const [deleteProblemById, { isLoading }] = useDeleteProblemByIdMutation();
  const router = useRouter();

  const { refetch } = useGetAllProblemsQuery({
    pageSize: 10,
    pageIndex: 0,
    globalFilter: "",
    sorting: [],
    filters: [],
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDelete = async (id: string) => {
    try {
      var res = await deleteProblemById(id).unwrap();

      if(res.success != true && res.message != null) throw new Error(res.message);

      toast.success("The problem was deleted successfully.");
      refetch();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Delete Error:", error);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            variant="ghost"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() =>
              router.push(`/practice/problem/${row.getValue("id")}`)
            }
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/administration/problems/edit/${row.getValue("id")}`)
            }
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setIsDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this problem? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              variant="destructive"
              onClick={() => handleDelete(row.getValue("id"))}
            >
              {isLoading ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
