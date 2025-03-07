"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/core/common/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/common/select";
import { Input } from "@/components/core/common/input";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/core/common/tooltip";
import { Problem } from "@/store/queries/problem";

interface DataTablePaginationProps {
  table: Table<Problem>;
  isLoading?: boolean;
}

export function DataTablePagination({
  table,
  isLoading = false,
}: DataTablePaginationProps) {
  const [pageInput, setPageInput] = useState<string>(
    (table.getState().pagination.pageIndex + 1).toString()
  );

  const setPageIndexWithOffset = (pageNumber: number) => {
    const pageIndex = pageNumber - 1; 
    table.setPageIndex(pageIndex);
    setPageInput(pageNumber.toString());
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = Number.parseInt(pageInput);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= table.getPageCount()
    ) {
      setPageIndexWithOffset(pageNumber);
    } else {
      setPageInput((table.getState().pagination.pageIndex + 1).toString());
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value);
    table.setPageSize(newSize);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground order-2 sm:order-1">
        <div className="flex items-center gap-1">
          <span>{table.getFilteredSelectedRowModel().rows.length}</span>
          <span className="hidden sm:inline">problem(s) selected</span>
          <span className="sm:hidden">selected</span>
        </div>
        <span>of</span>
        <span>{table.getFilteredRowModel().rows.length}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 order-1 sm:order-2">
        <div className="flex items-center gap-2">
          <form onSubmit={handlePageSubmit} className="flex items-center gap-2">
            <Input
              className="h-8 w-[50px] text-center"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={handlePageSubmit}
            />
            <span className="text-sm text-muted-foreground">
              of {table.getPageCount()}
            </span>
          </form>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            per page
          </span>
        </div>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPageIndexWithOffset(1)}
                  disabled={!table.getCanPreviousPage() || isLoading}
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="sr-only">First page</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>First page</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    setPageIndexWithOffset(
                      table.getState().pagination.pageIndex
                    )
                  }
                  disabled={!table.getCanPreviousPage() || isLoading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous page</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    setPageIndexWithOffset(
                      table.getState().pagination.pageIndex + 2
                    )
                  }
                  disabled={!table.getCanNextPage() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="sr-only">Next page</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next page</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPageIndexWithOffset(table.getPageCount())}
                  disabled={!table.getCanNextPage() || isLoading}
                >
                  <ChevronsRight className="h-4 w-4" />
                  <span className="sr-only">Last page</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Last page</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
