"use client"

import { useState } from "react"
import { ListFilter } from "lucide-react"
import { Button } from "@/components/core/common/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/core/common/dropdown-menu"

interface FilterOption {
  id: string
  label: string
}

interface FilterCategory {
  id: string
  name: string
  options: FilterOption[]
}

interface FilterDropdownProps {
  onFilterChange: (filters: Record<string, string[]>) => void
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const filterCategories: FilterCategory[] = [
    {
      id: "progress",
      name: "Progress",
      options: [
        { id: "not-started", label: "Not Started" },
        { id: "in-progress", label: "In Progress" },
        { id: "completed", label: "Completed" },
      ],
    },
    {
      id: "assignments",
      name: "Assignments",
      options: [
        { id: "few", label: "1-5 Assignments" },
        { id: "medium", label: "6-10 Assignments" },
        { id: "many", label: "11+ Assignments" },
      ],
    },
  ]

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const handleFilterToggle = (categoryId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }

      if (!newFilters[categoryId]) {
        newFilters[categoryId] = []
      }

      if (newFilters[categoryId].includes(optionId)) {
        newFilters[categoryId] = newFilters[categoryId].filter((id) => id !== optionId)
        if (newFilters[categoryId].length === 0) {
          delete newFilters[categoryId]
        }
      } else {
        newFilters[categoryId] = [...newFilters[categoryId], optionId]
      }

      onFilterChange(newFilters)
      return newFilters
    })
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((count, options) => count + options.length, 0)
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 relative">
          <ListFilter className="h-4 w-4 mr-2" />
          Filter
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {filterCategories.map((category) => (
          <div key={category.id}>
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground pt-2">
              {category.name}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {category.options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={`${category.id}-${option.id}`}
                  checked={selectedFilters[category.id]?.includes(option.id) || false}
                  onCheckedChange={() => handleFilterToggle(category.id, option.id)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </div>
        ))}

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2"
            onClick={() => {
              setSelectedFilters({})
              onFilterChange({})
            }}
          >
            Clear All Filters
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

