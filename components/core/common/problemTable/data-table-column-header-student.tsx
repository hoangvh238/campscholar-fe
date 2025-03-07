"use client";

import { Badge } from "@/components/core/common/badge";
import { Button } from "@/components/core/common/button";
import { Checkbox } from "@/components/core/common/checkbox";
import { Input } from "@/components/core/common/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/core/common/popover";
import { Separator } from "@/components/core/common/separator";
import { Slider } from "@/components/core/common/slider";
import type { Column } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  Filter,
  FilterX,
  Search,
  SortAscIcon,
  SortDescIcon,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// interface DateValue {
//   startDate: any
//   endDate:  any
// }

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  type?: "text" | "number" | "select" | "multiselect" | "date" | "boolean";
  options?: { label: string; value: string | number }[];
  minValue?: number;
  maxValue?: number;
  disableSorting?: boolean;
}

export function DataTableColumnHeaderStudent<TData, TValue>({
  column,
  title,
  type = "text",
  options = [],
  minValue = 0,
  maxValue = 100,
  disableSorting = false,
}: DataTableColumnHeaderProps<TData, TValue>) {
  // Current filter values (applied)
  const [isFiltering, setIsFiltering] = useState(false);

  // Temporary filter values (not yet applied)
  const [tempFilterValue, setTempFilterValue] = useState("");
  const [tempSelectedOptions, setTempSelectedOptions] = useState<string[]>([]);
  const [tempNumberRange, setTempNumberRange] = useState<[number, number]>([
    minValue,
    maxValue,
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [tempDateRange, setTempDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Check if column has filter or sorting
  const isSorted = column.getIsSorted();

  // Sync local state with column filter value when popover opens
  useEffect(() => {
    if (isOpen) {
      const filterValue = column.getFilterValue();

      // Initialize temporary values from current filter
      if (type === "multiselect" && Array.isArray(filterValue)) {
        setIsFiltering(filterValue.length > 0);
        setTempSelectedOptions((filterValue as string[]) || []);
      } else if (type === "text" && typeof filterValue === "string") {
        setIsFiltering(!!filterValue);
        setTempFilterValue(filterValue || "");
      } else if (
        type === "date" &&
        typeof filterValue === "object" &&
        filterValue !== null
      ) {
        // const dateValue = filterValue as DateValue
        // setIsFiltering(!!(dateValue?.startDate || dateValue?.endDate))
        // setTempDateRange(dateValue)
      } else if (
        type === "number" &&
        typeof filterValue === "object" &&
        filterValue !== null
      ) {
        const { min = minValue, max = maxValue } = filterValue as {
          min?: number;
          max?: number;
        };
        setIsFiltering(min !== minValue || max !== maxValue);
        setTempNumberRange([min, max]);
      } else {
        // Reset temporary state when filter is cleared
        if (type === "multiselect") {
          setTempSelectedOptions([]);
        } else if (type === "text") {
          setTempFilterValue("");
        } else if (type === "date") {
          setTempDateRange({
            startDate: null,
            endDate: null,
          });
        } else if (type === "number") {
          setTempNumberRange([minValue, maxValue]);
        }
      }
    }
  }, [column, isOpen, type, minValue, maxValue]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Apply filter changes
  const applyFilter = () => {
    if (type === "text") {
      column.setFilterValue(tempFilterValue || undefined);
      setIsFiltering(!!tempFilterValue);
    } else if (type === "multiselect") {
      column.setFilterValue(
        tempSelectedOptions.length > 0 ? tempSelectedOptions : undefined,
      );
      setIsFiltering(tempSelectedOptions.length > 0);
    } else if (type === "date") {
      column.setFilterValue(tempDateRange);
      setIsFiltering(!!(tempDateRange?.startDate || tempDateRange?.endDate));
    } else if (type === "number") {
      const isDefault =
        tempNumberRange[0] === minValue && tempNumberRange[1] === maxValue;
      column.setFilterValue(
        isDefault
          ? undefined
          : { min: tempNumberRange[0], max: tempNumberRange[1] },
      );
      setIsFiltering(!isDefault);
    }

    // Close the popover after applying
    setIsOpen(false);
  };

  // Clear filter
  const clearFilter = () => {
    // Reset temporary values
    setTempFilterValue("");
    setTempSelectedOptions([]);
    setTempDateRange({
      startDate: null,
      endDate: null,
    });
    setTempNumberRange([minValue, maxValue]);

    // Clear the actual filter
    column.setFilterValue(undefined);
    setIsFiltering(false);

    // Close the popover after clearing
    setIsOpen(false);
  };

  // Custom Shortcut Logic for dates
  const setDateShortcut = (range: any) => {
    setTempDateRange(range);
  };

  // Handle multiselect option change
  const handleTempMultiselectChange = (
    optionValue: string,
    checked: boolean,
  ) => {
    const newSelected = checked
      ? [...tempSelectedOptions, optionValue]
      : tempSelectedOptions.filter((o) => o !== optionValue);

    setTempSelectedOptions(newSelected);
  };

  const renderFilterContent = () => {
    switch (type) {
      case "text":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${title.toLowerCase()}...`}
                value={tempFilterValue}
                onChange={(e) => setTempFilterValue(e.target.value)}
                className="h-8"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter Options</span>
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => {
                  setTempFilterValue(`starts:${tempFilterValue}`);
                }}
              >
                Starts with
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => {
                  setTempFilterValue(`ends:${tempFilterValue}`);
                }}
              >
                Ends with
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => {
                  setTempFilterValue(`contains:${tempFilterValue}`);
                }}
              >
                Contains
              </Button>
            </div>
          </div>
        );

      case "multiselect":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search options..."
                value={tempFilterValue}
                onChange={(e) => setTempFilterValue(e.target.value)}
                className="h-8"
              />
            </div>
            <div className="max-h-[200px] space-y-2 overflow-y-auto pr-1">
              {options
                .filter((opt) =>
                  opt.label
                    .toLowerCase()
                    .includes(tempFilterValue.toLowerCase()),
                )
                .map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={tempSelectedOptions.includes(
                        String(option.value),
                      )}
                      onCheckedChange={(checked) => {
                        handleTempMultiselectChange(
                          String(option.value),
                          !!checked,
                        );
                      }}
                    />
                    <span className="text-sm">{option.label}</span>
                  </div>
                ))}
            </div>
          </div>
        );

      case "number":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Range</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {tempNumberRange[0]}
                  </span>
                  <span className="text-sm text-muted-foreground">-</span>
                  <span className="text-sm text-muted-foreground">
                    {tempNumberRange[1]}
                  </span>
                </div>
              </div>
              <Slider
                defaultValue={[minValue, maxValue]}
                value={tempNumberRange}
                min={minValue}
                max={maxValue}
                step={1}
                onValueChange={(value) => {
                  setTempNumberRange(value as [number, number]);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Min</span>
                  <Input
                    type="number"
                    value={tempNumberRange[0]}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      if (
                        !isNaN(value) &&
                        value >= minValue &&
                        value <= tempNumberRange[1]
                      ) {
                        setTempNumberRange([value, tempNumberRange[1]]);
                      }
                    }}
                    className="h-8"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Max</span>
                  <Input
                    type="number"
                    value={tempNumberRange[1]}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      if (
                        !isNaN(value) &&
                        value <= maxValue &&
                        value >= tempNumberRange[0]
                      ) {
                        setTempNumberRange([tempNumberRange[0], value]);
                      }
                    }}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => {
                  setTempNumberRange([minValue, 10]);
                }}
              >
                Less than 10
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => {
                  setTempNumberRange([10, 50]);
                }}
              >
                Between 10 and 50
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => {
                  setTempNumberRange([50, maxValue]);
                }}
              >
                More than 50
              </Button>
            </div>
          </div>
        );

      case "date":
        return (
          <div className="space-y-4">
            {/* <Datepicker 
                value={tempDateRange} 
                onChange={tempDateRange => handleTempDateChange(tempDateRange)}
                showShortcuts={true}
            />  */}

            {/* <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => setDateShortcut({ startDate: startOfToday(), endDate: startOfToday() })}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => setDateShortcut({ startDate: startOfYesterday(), endDate: startOfYesterday() })}
              >
                Yesterday
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() => setDateShortcut({ startDate: addDays(new Date(), -7), endDate: new Date() })}
              >
                Last 7 Days
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left font-normal"
                onClick={() =>
                  setDateShortcut({ startDate: startOfMonth(new Date()), endDate: endOfMonth(new Date()) })
                }
              >
                This Month
              </Button>
            </div> */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium">{title}</span>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            {isFiltering ? (
              <Filter className="h-4 w-4 text-primary" />
            ) : isSorted ? (
              <ArrowUpDown className="h-4 w-4 text-primary" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
            {isFiltering && (
              <Badge
                variant="secondary"
                className="ml-1 rounded-sm px-1 font-normal"
              >
                1
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[220px] p-0"
          align="start"
          ref={popoverRef}
        >
          <div className="grid gap-2 p-4">
            {!disableSorting && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sort</span>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${isSorted === "asc" ? "bg-accent" : ""}`}
                      onClick={() => column.toggleSorting(false)}
                    >
                      <SortAscIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${isSorted === "desc" ? "bg-accent" : ""}`}
                      onClick={() => column.toggleSorting(true)}
                    >
                      <SortDescIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        column.clearSorting();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {renderFilterContent()}

            <div className="mt-2 flex items-center justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter();
                }}
                className="flex-1"
              >
                <FilterX className="mr-2 h-4 w-4" />
                Clear
              </Button>

              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  applyFilter();
                }}
                className="flex-1"
              >
                <Check className="mr-2 h-4 w-4" />
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
