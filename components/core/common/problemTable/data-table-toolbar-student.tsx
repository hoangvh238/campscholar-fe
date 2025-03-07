"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import type { Table } from "@tanstack/react-table"

import { DataTableViewOptions } from "./data-table-view-options"

import { Button } from "@/components/core/common/button"
import { Input } from "@/components/core/common/input"
import { useState, useEffect } from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onSearchChange?: (value: string) => void
  onResetFilters?: () => void
}

export function DataTableToolbarStudent<TData>({
  table,
  onSearchChange,
  onResetFilters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [searchValue, setSearchValue] = useState("")

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(searchValue)
      }

      // Also update the column filter for local filtering if needed
      if (table.getColumn("name")) {
        table.getColumn("name")?.setFilterValue(searchValue)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue, onSearchChange, table])

  const handleReset = () => {
    setSearchValue("")
    table.resetColumnFilters()

    if (onResetFilters) {
      onResetFilters()
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          className="h-9 w-full md:w-[250px] lg:w-[350px]"
          placeholder="Search problems by name..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        {isFiltered && (
          <Button className="h-9 px-2 lg:px-3" variant="ghost" onClick={handleReset}>
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

