"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core/common/table";
import { useDataTable } from "@/hooks/useDataTable";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { DataTableActiveFilters } from "./data-table-active-filters";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbarInstructor } from "./data-table-toolbar-instructor";

interface DataTableProps {
  columns: ColumnDef<any>[];
  onDeleteSelected?: (ids: string[]) => Promise<void>;
}

export function DataTableInstructor({
  columns,
  onDeleteSelected,
}: DataTableProps) {

 
  const {
    state,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setRowSelection,
    setPagination,
    setGlobalFilter,
    resetFilters,
    clearFilter,
    clearSort,
    tableData,
    pageCount,
    isLoading,
    isFetching,
  } = useDataTable();

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting: state.sorting,
      columnFilters: state.columnFilters,
      columnVisibility: {
        categories: false, 
        resolvedStatus: false,
        id: false,
        ...state.columnVisibility,
      },
      rowSelection: state.rowSelection,
      pagination: state.pagination,
    },
    pageCount,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  const isTableLoading = useMemo(
    () => isLoading || (isFetching && tableData.length === 0),
    [isLoading, isFetching, tableData],
  );

  return (
    <div className="space-y-4">
      <DataTableToolbarInstructor
        table={table}
        onSearchChange={setGlobalFilter}
        onResetFilters={resetFilters}
      />

      {(state.columnFilters.length > 0 || state.sorting.length > 0) && (
        <DataTableActiveFilters
          columnFilters={state.columnFilters}
          sorting={state.sorting}
          onClearFilter={clearFilter}
          onClearSort={clearSort}
          onClearAllFilters={resetFilters}
        />
      )}

      <div className="relative rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isTableLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {isFetching && !isLoading && tableData.length > 0 && (
          <div className="absolute right-0 top-0 m-4">
            <div className="flex items-center gap-2 rounded-md bg-background/90 p-2 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-xs font-medium">Updating...</span>
            </div>
          </div>
        )}
      </div>

      <DataTablePagination table={table} isLoading={isLoading || isFetching} />
    </div>
  );
}
