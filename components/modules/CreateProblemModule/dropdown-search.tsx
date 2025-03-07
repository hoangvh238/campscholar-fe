import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/core/common/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/core/common/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/core/common/popover";

export type DropdownSearchItem = {
  value: string;
  label: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DropdownSearchProps {
  items?: DropdownSearchItem[];
  placeholder?: string;
  emptyMessage?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export function DropdownSearch({
  items = [],
  placeholder = "Select an item...",
  emptyMessage = "No items found.",
  onChange,
  value,
}: DropdownSearchProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-full justify-between"
          role="combobox"
          variant="outline"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
          />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {items?.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  const newValue = item.value === value ? "" : item.value;
                  onChange?.(newValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
