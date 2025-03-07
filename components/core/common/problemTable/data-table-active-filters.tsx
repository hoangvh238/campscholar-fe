"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/core/common/badge"
import { Button } from "@/components/core/common/button"
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table"
import { format } from "date-fns"

interface DataTableActiveFiltersProps {
  columnFilters: ColumnFiltersState
  sorting: SortingState
  onClearFilter: (id: string) => void
  onClearSort: (id: string) => void
  onClearAllFilters: () => void
}

export function DataTableActiveFilters({
  columnFilters,
  sorting,
  onClearFilter,
  onClearSort,
  onClearAllFilters,
}: DataTableActiveFiltersProps) {
  // Filter out empty filters (like empty arrays or "None" values)
  const activeFilters = columnFilters.filter((filter) => {
    if (Array.isArray(filter.value) && filter.value.length === 0) return false
    if (filter.value === "None" || filter.value === null || filter.value === undefined) return false
    if (typeof filter.value === "object" && !Array.isArray(filter.value)) {
      // For date ranges and number ranges
      const values = Object.values(filter.value)
      if (values.every((v) => v === null || v === undefined)) return false
    }
    return true
  })

  if (activeFilters.length === 0 && sorting.length === 0) return null

  // Format filter value for display
  const formatFilterValue = (id: string, value: any) => {
    if (id === "difficultyLevel" || id === "categories" || id === "resolvedStatus") {
      if (Array.isArray(value) && value.length > 0) {
        return value.join(", ")
      }
      return null // Return null for empty arrays to filter them out
    }

    if (id === "updatedDate" && value) {
      const { startDate, endDate } = value
      if (startDate && endDate) {
        return `${format(new Date(startDate), "dd/MM/yyyy")} - ${format(new Date(endDate), "dd/MM/yyyy")}`
      } else if (startDate) {
        return `From ${format(new Date(startDate), "dd/MM/yyyy")}`
      } else if (endDate) {
        return `Until ${format(new Date(endDate), "dd/MM/yyyy")}`
      }
      return null
    }

    if (id === "point" && value) {
      const { min, max } = value
      if (min !== undefined && max !== undefined) {
        return `${min} - ${max} points`
      } else if (min !== undefined) {
        return `Min ${min} points`
      } else if (max !== undefined) {
        return `Max ${max} points`
      }
      return null
    }

    if (id === "codeTemplate") {
      return value === "available" ? "Available" : "Not Available"
    }

    return String(value)
  }

  // Get human-readable column name
  const getColumnName = (id: string) => {
    const columnNames: Record<string, string> = {
      name: "Name",
      difficultyLevel: "Difficulty",
      categories: "Categories",
      point: "Points",
      updatedDate: "Updated Date",
      resolvedStatus: "Status",
      codeTemplate: "Template",
    }
    return columnNames[id] || id
  }

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Active Filters:</span>

        {/* Display sorting */}
        {sorting.map((sort) => (
          <Badge
            key={`sort-${sort.id}`}
            variant="outline"
            className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700"
          >
            <span className="font-medium">Sort: {getColumnName(sort.id)}</span>
            <span>{sort.desc ? "Descending" : "Ascending"}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                onClearSort(sort.id)
              }}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove sort</span>
            </Button>
          </Badge>
        ))}

        {/* Display filters */}
        {activeFilters.map((filter) => {
          const displayValue = formatFilterValue(filter.id, filter.value)
          if (!displayValue) return null // Skip rendering if no meaningful value

          return (
            <Badge key={`filter-${filter.id}`} variant="secondary" className="flex items-center gap-1">
              <span className="font-medium">{getColumnName(filter.id)}:</span>
              <span className="max-w-[150px] truncate">{displayValue}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  onClearFilter(filter.id)
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          )
        })}

        {(activeFilters.length > 0 || sorting.length > 0) && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={(e) => {
              e.stopPropagation()
              onClearAllFilters()
            }}
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  )
}

